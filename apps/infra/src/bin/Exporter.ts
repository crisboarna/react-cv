#!/usr/bin/env node
import { App, Aspects, Environment } from 'aws-cdk-lib';
import { PROJECT_NAME } from '../config';
import { artifactPathCvExport, lambdaCvExport } from '../config/lambda';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { CDKDirectoryUtil, LambdaUtilStack } from 'aws-cdk-lib-util';

CDKDirectoryUtil.checkArtifactDirectoryExists(artifactPathCvExport);

const app = new App();

const ENV = process.env.ENV;

const env: Environment = {
  account: process.env.CDK_ACCOUNT,
  region: 'us-east-1',
};

const exporter = new LambdaUtilStack(app, `${lambdaCvExport.name}-${ENV}`, {
  description:
    'Stack containing the Exporter Lambda used as Custom Resource by Web Stack to deploy CV to S3',
  env,
  lambda: lambdaCvExport,
  projectName: PROJECT_NAME,
  stackEnv: ENV,
});

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
NagSuppressions.addStackSuppressions(exporter, [
  {
    id: 'AwsSolutions-IAM4',
    reason: 'Resources have sufficient scope given role',
  },
  {
    id: 'AwsSolutions-SQS3',
    reason: 'It is a DLQ',
  },
  {
    id: 'AwsSolutions-SQS4',
    reason: 'No HTTPS enablement option',
  },
  {
    id: 'AwsSolutions-IAM5',
    reason: 'XRay policy that is AWS managed',
  },
]);
