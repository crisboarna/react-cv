#!/usr/bin/env node
import { App, Aspects } from 'aws-cdk-lib';
import {
  ARTIFACT_PATH_WEB,
  AWS_ACCOUNT,
  AWS_DOMAIN_NAME,
  AWS_REGION,
  PARAM_ACM_DOMAIN_ARN_CF,
  PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
  PROJECT_NAME,
  PROJECT_NAME_MAIN,
  TARGET_ENV,
} from '../config';
import { WebStack } from '../lib/web/WebStack';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import * as path from 'path';

const artifactPath = path.resolve(__dirname, ARTIFACT_PATH_WEB);
CDKDirectoryUtil.checkArtifactDirectoryExists(artifactPath);

const app = new App();

const web = new WebStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${TARGET_ENV}`,
  {
    description:
      'Stack containing the resources needed for web serving such as CDN, S3, S3 deployment, DNS',
    env: {
      account: AWS_ACCOUNT,
      region: AWS_REGION,
    },
    artifactPath,
    domainCertParamName: PARAM_ACM_DOMAIN_ARN_CF,
    domainName: AWS_DOMAIN_NAME,
    exporterFnParamName: PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
    projectName: PROJECT_NAME,
    projectNameMain: PROJECT_NAME_MAIN,
    stackEnv: TARGET_ENV,
  }
);

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
NagSuppressions.addStackSuppressions(web, [
  {
    id: 'AwsSolutions-IAM4',
    reason: 'Resources have sufficient scope given role',
  },
  {
    id: 'AwsSolutions-IAM5',
    reason: 'XRay policy that is AWS managed',
  },
  {
    id: 'AwsSolutions-L1',
    reason: 'CDK generated construct, cannot update BucketDeployment Lambda version',
  }
]);
