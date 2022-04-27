#!/usr/bin/env node
import { App, Aspects } from 'aws-cdk-lib';
import {
  ARTIFACT_PATH_WEB,
  PARAM_ACM_DOMAIN_ARN_CF,
  PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
  PROJECT_NAME,
  PROJECT_NAME_MAIN,
} from '../config';
import { WebStack } from '../lib/web/WebStack';
import { AwsSolutionsChecks } from 'cdk-nag';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import * as path from 'path';

const artifactPath = path.resolve(__dirname, ARTIFACT_PATH_WEB);
CDKDirectoryUtil.checkArtifactDirectoryExists(artifactPath);

const app = new App();

const ENV = process.env.ENV;

new WebStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    description:
      'Stack containing the resources needed for web serving such as CDN, S3, S3 deployment, DNS',
    env: {
      account: process.env.CDK_ACCOUNT,
      region: 'us-east-1',
    },
    artifactPath,
    domainCertParamName: PARAM_ACM_DOMAIN_ARN_CF,
    domainName: process.env.CDK_DOMAIN_NAME,
    exporterFnParamName: PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
    projectName: PROJECT_NAME,
    projectNameMain: PROJECT_NAME_MAIN,
    stackEnv: ENV,
  }
);

// Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
