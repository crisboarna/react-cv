import { Environment } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export type IAMPolicyGetter = (
  env: Environment,
  projectName: string,
  stackEnv: string
) => PolicyStatement[];

export const getApiIAMPolicies = (name: string): IAMPolicyGetter => {
  switch (name) {
    case 'exporter':
      return LambdaExportCVPolicies;
    default:
      return () => [];
  }
};

export const LambdaExportCVPolicies = () => [
  new PolicyStatement({
    resources: [
      `arn:aws:s3:::cv.${process.env.CDK_DOMAIN_NAME}/Cristian Boarna CV.pdf`,
    ],
    actions: ['s3:PutObject'],
  }),
];
