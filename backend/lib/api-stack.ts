import {
  aws_apigateway as apigw,
  aws_cognito as cognito,
  aws_dynamodb as dynamodb,
  aws_iam as iam,
  aws_lambda as lambda,
  CfnOutput,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  iotTable: dynamodb.Table;
  userPool: cognito.UserPool;
  tags: {
    project: string;
  };
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { iotTable, userPool } = props;
    const { project } = props.tags;

    const queryDynamodbLambdaRole = new iam.Role(
      this,
      "IotQueryDynamoDbLambdaRole",
      {
        roleName: `${project}-query-dynamodb-lambda-role`,
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
        ],
        inlinePolicies: {
          GetDynamoDb: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                resources: [iotTable.tableArn],
                actions: ["dynamodb:Query"],
              }),
            ],
          }),
        },
      }
    );

    // Create a Cognito Authorizer
    const authorizer = new apigw.CognitoUserPoolsAuthorizer(
      this,
      "CognitoAuthorizer",
      {
        cognitoUserPools: [userPool],
      }
    );

    const queryDynamoDbLambda = new lambda.Function(
      this,
      "IoTQueryDynamoDbLambda",
      {
        runtime: lambda.Runtime.PYTHON_3_12,
        handler: "index.lambda_handler",
        code: lambda.Code.fromAsset("./lib/lambda"),
        role: queryDynamodbLambdaRole,
        functionName: `${project}-query-dynamodb-lambda`,
        environment: {
          DYNAMODB_TABLE: iotTable.tableName,
        },
      }
    );

    const queryApiGateway = new apigw.LambdaRestApi(
      this,
      "IotQueryApiGateway",
      {
        handler: queryDynamoDbLambda,
        restApiName: `${project}-query-api-gateway`,
        defaultMethodOptions: {
          authorizationType: apigw.AuthorizationType.COGNITO,
          authorizer: authorizer,
        },
        defaultCorsPreflightOptions: {
          allowOrigins: apigw.Cors.ALL_ORIGINS,
          allowMethods: apigw.Cors.ALL_METHODS,
          allowHeaders: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
          ],
        },
      }
    );

    new CfnOutput(this, "QueryApiUrl", {
      value: queryApiGateway.url,
    });
  }
}
