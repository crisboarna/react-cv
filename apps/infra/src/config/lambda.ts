import * as path from 'path';
import {
  AWS_DOMAIN_NAME,
  PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
  PARAM_LAMBDA_CV_EXPORT_LAYER_ARN,
  PARAM_LAMBDA_CV_EXPORT_ROLE_ARN,
  PARAM_SNS_ALARMS_ARN,
  PROJECT_NAME,
  PROJECT_NAME_MAIN,
} from './index';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { getApiIAMPolicies } from '../lib/exporter/util';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { CDKStringUtil, LambdaProps } from 'aws-cdk-lib-util';

const rootArtifactPath = './../../../../dist/apps';

//===CV Export===
const lambdaNameCvExport = 'exporter';
export const artifactPathCvExport = path.join(
  __dirname,
  `${rootArtifactPath}/${lambdaNameCvExport}`
);
const nameCapitalizedCvExport =
  CDKStringUtil.capitalizeInputString(lambdaNameCvExport);

export const lambdaCvExport: LambdaProps = {
  alarmTopicParam: `/${PROJECT_NAME_MAIN.toLowerCase()}${PARAM_SNS_ALARMS_ARN}`,
  artifactPath: artifactPathCvExport,
  environmentGeneration: () => ({
    APP_NAME: nameCapitalizedCvExport,
    CV_URL: `cv.${AWS_DOMAIN_NAME}`,
  }),
  extraActions: ({ lambdaAlias }) =>
    lambdaAlias.grantInvoke(
      new ServicePrincipal('cloudformation.amazonaws.com')
    ),
  isInVpc: false,
  isProvisioned: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  memorySize: 1024,
  layers: [{ paramName: PARAM_LAMBDA_CV_EXPORT_LAYER_ARN }],
  name: `${PROJECT_NAME}-${nameCapitalizedCvExport}`,
  paramName: PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_CV_EXPORT_ROLE_ARN,
  runtime: Runtime.NODEJS_20_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameCvExport)(env, PROJECT_NAME, stackEnv),
};
