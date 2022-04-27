#!/usr/bin/env node
import { App, Aspects, Environment } from 'aws-cdk-lib';
import { AWS_ACCOUNT, AWS_REGION, PROJECT_NAME, TARGET_ENV } from '../config';
import { artifactPathCvExport, lambdaCvExport } from '../config/lambda';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { CDKDirectoryUtil, LambdaUtilStack } from 'aws-cdk-lib-util';

CDKDirectoryUtil.checkArtifactDirectoryExists(artifactPathCvExport);

const app = new App();

const env: Environment = {
  account: AWS_ACCOUNT,
  region: AWS_REGION,
};

const exporter = new LambdaUtilStack(
  app,
  `${lambdaCvExport.name}-${TARGET_ENV}`,
  {
    description:
      'Stack containing the Exporter Lambda used as Custom Resource by Web Stack to deploy CV to S3',
    env,
    lambda: lambdaCvExport,
    projectName: PROJECT_NAME,
    stackEnv: TARGET_ENV,
  }
);

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
