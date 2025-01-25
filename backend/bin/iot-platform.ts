#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/api-stack";
import { AuthStack } from "../lib/auth-stack";
import { DatabaseStack } from "../lib/database-stack";
import { IotStack } from "../lib/iot-stack";
import { WebsiteStack } from "../lib/website-stack";

const app = new cdk.App();

const { account, region, tags } = app.node.tryGetContext("general");

const databaseStack = new DatabaseStack(app, "DatabaseStack", {
  env: {
    account,
    region,
  },
  tags,
});

new IotStack(app, "IotStack", {
  env: {
    account,
    region,
  },
  tags,
  iotTable: databaseStack.iotTable,
});

new ApiStack(app, "ApiStack", {
  env: {
    account,
    region,
  },
  tags,
  iotTable: databaseStack.iotTable,
});

new WebsiteStack(app, "WebsiteStack", {
  env: {
    account,
    region,
  },
  tags,
});

new AuthStack(app, "AuthStack", {
  env: {
    account,
    region,
  },
  tags,
});
