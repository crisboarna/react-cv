#!/usr/bin/env node
import { App, Aspects } from 'aws-cdk-lib';
import {
  ARTIFACT_PATH_EXPORTER_LAYER,
  PARAM_LAMBDA_CV_EXPORT_LAYER_ARN,
  PROJECT_NAME,
} from '../config';
import { ExporterLayerStack } from '../lib/exporter-layer/ExporterLayerStack';
import { AwsSolutionsChecks } from 'cdk-nag';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import * as path from 'path';

const artifactPath = path.resolve(__dirname, ARTIFACT_PATH_EXPORTER_LAYER);
CDKDirectoryUtil.checkArtifactFileExists(artifactPath);

const app = new App();

const ENV = process.env.ENV;

new ExporterLayerStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    description:
      'Stack deploying the Lambda Layer containing Chromium to be used by the Exporter Lambda',
    env: {
      account: process.env.CDK_ACCOUNT,
      region: 'us-east-1',
    },
    artifactPath,
    layerParamName: PARAM_LAMBDA_CV_EXPORT_LAYER_ARN,
    projectName: PROJECT_NAME,
    stackEnv: ENV,
  }
);

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
