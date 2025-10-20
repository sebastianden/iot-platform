# IoT Platform

This repository contains everything necessary to spin up a fully functioning IoT platform including configuration of edge devices, fully functional AWS backend and Next.js frontend. All AWS service usage is within the free tier range. Deploying and running this project costs exactly 0$.

<p align="center">
  <img src="img/474shots_so.png" width="45%" />
  <img src="img/225shots_so.png" width="45%" />
</p>

## Architecture

![](img/iot-platform-architecture.drawio.png)

## Getting Started

### Sensors

Follow the instructions of the `README.md` in the respective sensor type's directory in the `edge/` folder.

### Deploying Frontend & Backend

Prerequisites:

- Node
- AWS CLI
- AWS CDK

Use the Makefile to deploy the application:

- Run `make backend` to build and deploy the AWS backend. This will run `cdk deploy`.
- Run `make frontend` to build and deploy the Next.js frontend. This will run `npm run build` and upload the static website files to an S3 bucket.

or:

- Run `make app` to deploy both