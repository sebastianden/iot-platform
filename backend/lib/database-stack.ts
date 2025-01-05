import { aws_dynamodb as dynamodb, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

interface DatabaseStackProps extends StackProps {
  tags: {
    project: string;
  };
}

export class DatabaseStack extends Stack {
  public readonly iotTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const { project } = props.tags;

    this.iotTable = new dynamodb.Table(this, "IotDynamoDbTable", {
      tableName: `${project}-dynamodb-table`,
      partitionKey: { name: "device", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "timestamp", type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
}
