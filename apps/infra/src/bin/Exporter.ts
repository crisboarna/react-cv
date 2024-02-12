#!/usr/bin/env node
import { App, Aspects, Environment } from 'aws-cdk-lib';
import {
  AWS_ACCOUNT,
  AWS_REGION,
  ECR_REPO_NAME,
  PROJECT_NAME,
  TARGET_ENV,
} from '../config';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { ExporterStack } from '../lib/exporter/ExporterStack';

const app = new App();

const env: Environment = {
  account: AWS_ACCOUNT,
  region: AWS_REGION,
};

const exporter = new ExporterStack(
  app,
  `${PROJECT_NAME}-Exporter-${TARGET_ENV}`,
  {
    description:
      'Stack containing the Exporter Lambda used as Custom Resource by Web Stack to deploy CV to S3',
    env,
    projectName: PROJECT_NAME,
    stackEnv: TARGET_ENV,
    ecrRepoName: ECR_REPO_NAME,
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
