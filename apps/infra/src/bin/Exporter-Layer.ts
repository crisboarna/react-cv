#!/usr/bin/env node
import { App, Aspects } from 'aws-cdk-lib';
import {
  ARTIFACT_PATH_EXPORTER_LAYER,
  AWS_ACCOUNT,
  AWS_REGION,
  PARAM_LAMBDA_CV_EXPORT_LAYER_ARN,
  PROJECT_NAME,
  TARGET_ENV,
} from '../config';
import { ExporterLayerStack } from '../lib/exporter-layer/ExporterLayerStack';
import { AwsSolutionsChecks } from 'cdk-nag';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import * as path from 'path';

const artifactPath = path.resolve(__dirname, ARTIFACT_PATH_EXPORTER_LAYER);
CDKDirectoryUtil.checkArtifactFileExists(artifactPath);

const app = new App();

new ExporterLayerStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${TARGET_ENV}`,
  {
    description:
      'Stack deploying the Lambda Layer containing Chromium to be used by the Exporter Lambda',
    env: {
      account: AWS_ACCOUNT,
      region: AWS_REGION,
    },
    artifactPath,
    layerParamName: PARAM_LAMBDA_CV_EXPORT_LAYER_ARN,
    projectName: PROJECT_NAME,
    stackEnv: TARGET_ENV,
  }
);

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
