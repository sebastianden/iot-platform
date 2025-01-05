import {
  aws_dynamodb as dynamodb,
  aws_iam as iam,
  aws_iot as iot,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";

interface IotStackProps extends StackProps {
  env: {
    account: string;
    region: string;
  };
  tags: {
    project: string;
  };
  iotTable: dynamodb.Table;
}

export class IotStack extends Stack {
  constructor(scope: Construct, id: string, props: IotStackProps) {
    super(scope, id, props);

    const { iotTable } = props;
    const { account, region } = props.env;
    const { project } = props.tags;

    const iotThing = new iot.CfnThing(this, "IotThing", {
      thingName: "core2",
    });

    const iotThingPolicy = new iot.CfnPolicy(this, "IotThingPolicy", {
      policyName: `${project}-thing-policy`,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "iot:Connect",
            Resource: `arn:aws:iot:${region}:${account}:client/\${iot:Connection.Thing.ThingName}`,
          },
          {
            Effect: "Allow",
            Action: "iot:Publish",
            Resource: `arn:aws:iot:${region}:${account}:topic/iot/\${iot:Connection.Thing.ThingName}`,
          },
          {
            Effect: "Allow",
            Action: "iot:Subscribe",
            Resource: `arn:aws:iot:${region}:${account}:topicfilter/iot/*`,
          },
          {
            Effect: "Allow",
            Action: "iot:Receive",
            Resource: `arn:aws:iot:${region}:${account}:topic/iot/*`,
          },
        ],
      },
    });

    // const iotCertificate = new iot.CfnCertificate(this, "IotCertificate", {
    //   status: "ACTIVE",
    //   certificatePem:,
    //   caCertificatePem:,

    // });

    // new iot.CfnPolicyPrincipalAttachment(this, "IotThingPolicyAttachment", {
    //   policyName: iotThingPolicy.ref,
    //   principal: iotCertificate.attrArn,
    // });

    // new iot.CfnThingPrincipalAttachment(this, "IotThingPrincipalAttachment", {
    //   thingName: iotThing.ref,
    //   principal: iotCertificate.attrArn,
    // });

    const iotRuleRole = new iam.Role(this, "IotDynamoDbTopicRuleRole", {
      roleName: `${project}-dynamodb-topic-rule-role`,
      assumedBy: new iam.ServicePrincipal("iot.amazonaws.com"),
      inlinePolicies: {
        IotToDynamoDb: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              resources: [iotTable.tableArn],
              actions: ["dynamodb:PutItem"],
            }),
          ],
        }),
      },
    });

    new iot.CfnTopicRule(this, "IotDynamoDbRule", {
      ruleName: `${project}dynamodbtopicrule`.replace(/-/g, ""),
      topicRulePayload: {
        actions: [
          {
            dynamoDBv2: {
              putItem: {
                tableName: iotTable.tableName,
              },
              roleArn: iotRuleRole.roleArn,
            },
          },
        ],
        sql: `SELECT *, topic(2) as device, timestamp() as timestamp FROM 'iot/+'`,
        ruleDisabled: false,
      },
    });
  }
}
