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
  certificateId: string;
}

export class IotStack extends Stack {
  constructor(scope: Construct, id: string, props: IotStackProps) {
    super(scope, id, props);

    const { iotTable, certificateId } = props;
    const { account, region } = props.env;
    const { project } = props.tags;

    const certificateArn = `arn:aws:iot:${region}:${account}:cert/${certificateId}`;

    const core2 = new iot.CfnThing(this, "Core2", {
      thingName: "core2",
    });

    new iot.CfnThingPrincipalAttachment(
      this,
      "IotThingPrincipalAttachmentCore2",
      {
        thingName: core2.ref,
        principal: certificateArn,
      }
    );

    const esp8266 = new iot.CfnThing(this, "Esp8266", {
      thingName: "esp8266",
    });

    new iot.CfnThingPrincipalAttachment(
      this,
      "IotThingPrincipalAttachmentEsp8266",
      {
        thingName: esp8266.ref,
        principal: certificateArn,
      }
    );

    const iotThingPolicy = new iot.CfnPolicy(this, "IotThingPolicy", {
      policyName: `${project}-thing-policy`,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "iot:Connect",
            Resource: `arn:aws:iot:${region}:${account}:client/*`,
          },
          {
            Effect: "Allow",
            Action: "iot:Publish",
            Resource: `arn:aws:iot:${region}:${account}:topic/iot/*`,
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

    new iot.CfnPolicyPrincipalAttachment(this, "IotThingPolicyAttachment", {
      policyName: iotThingPolicy.ref,
      principal: certificateArn,
    });

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
