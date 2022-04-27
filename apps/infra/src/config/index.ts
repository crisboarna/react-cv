export const PROJECT_NAME = 'CV';
export const PROJECT_NAME_MAIN = 'CRISBOARNA';

export const AWS_ACCOUNT = process.env.AWS_CDK_ACCOUNT;
export const AWS_REGION = process.env.AWS_CDK_REGION;
export const AWS_DOMAIN_NAME = process.env.AWS_CDK_DOMAIN_NAME;
export const TARGET_ENV = process.env.ENV;

export const ARTIFACT_PATH_WEB = './../../../../dist/apps/web/';
export const ARTIFACT_PATH_EXPORTER_LAYER =
  './../../../../dist/apps/infra/exporter-layer/chrome-aws-lambda.zip';

//===PARAMETERS===
//===ACM===
export const PARAM_ACM_DOMAIN_ARN_CF = `/acm/domain/cf/arn/`;

//===APIGW===
export const PARAM_API_GW_ID = `/apigw/id/`;

//===CDN===
export const PARAM_CDN_ID_CV = `cdn/id/cv/`;

//===LAMBDA===
export const PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN = `lambda/alias/arn/exporter/`;
export const PARAM_LAMBDA_CV_EXPORT_ROLE_ARN = `lambda/role/arn/exporter/`;
export const PARAM_LAMBDA_CV_EXPORT_LAYER_ARN = `lambda/layer/arn/exporter/`;

//===SNS===
export const PARAM_SNS_ALARMS_ARN = `/sns/alarms/arn/`;

export enum ENV {
  DEV = 'DEV',
  QA = 'QA',
  UAT = 'UAT',
  PROD = 'PROD',
}
