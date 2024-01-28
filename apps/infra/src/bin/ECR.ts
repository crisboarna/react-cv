#!/usr/bin/env node
import { App, Aspects } from 'aws-cdk-lib';
import {
  ARTIFACT_PATH_EXPORTER_LAYER,
  AWS_ACCOUNT,
  AWS_REGION,
  PROJECT_NAME,
  TARGET_ENV,
} from '../config';
import { AwsSolutionsChecks } from 'cdk-nag';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import * as path from 'path';
import { EcrStack } from '../lib/ecr/EcrStack';

const artifactPath = path.resolve(__dirname, ARTIFACT_PATH_EXPORTER_LAYER);
CDKDirectoryUtil.checkArtifactFileExists(artifactPath);

const app = new App();

new EcrStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${TARGET_ENV}`,
  {
    description: 'Stack deploying the ECR registry for the Lambda Exporter',
    env: {
      account: AWS_ACCOUNT,
      region: AWS_REGION,
    },
    projectName: PROJECT_NAME,
    stackEnv: TARGET_ENV,
    ecrRepoName: `${PROJECT_NAME.toLowerCase()}-exporter`,
  }
);

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
