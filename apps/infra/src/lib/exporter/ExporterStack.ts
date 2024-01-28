import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcrStackProps } from '../../interfaces';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import {
  Alias,
  Architecture,
  DockerImageCode,
  DockerImageFunction,
} from 'aws-cdk-lib/aws-lambda';
import {
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
  AWS_DOMAIN_NAME,
  PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
} from '../../config';
import { SSMUtil } from 'aws-cdk-lib-util';

export class ExporterStack extends Stack {
  constructor(scope: Construct, id: string, props?: EcrStackProps) {
    super(scope, id, props);

    const { ecrRepoName: repositoryName, projectName, stackEnv } = props;

    const repository = Repository.fromRepositoryName(
      this,
      `${projectName}-ECR-Exporter-${stackEnv}`,
      repositoryName
    );

    const lambdaRole = new Role(
      this,
      `${projectName}-Exporter-Role-${stackEnv}`,
      {
        roleName: `${projectName}-Exporter-Role-${stackEnv}`,
        description: `${projectName} Lambda Exporter Role`,
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName('AWSXrayWriteOnlyAccess'),
          ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole'
          ),
        ],
        inlinePolicies: {
          s3: new PolicyDocument({
            statements: [
              new PolicyStatement({
                resources: [
                  `arn:aws:s3:::cv.${AWS_DOMAIN_NAME}/Boarna Cristian CV.pdf`,
                ],
                actions: ['s3:PutObject'],
              }),
            ],
          }),
        },
      }
    );

    repository.grantPull(lambdaRole);

    const logGroup = new LogGroup(this, `${projectName}-Exporter-Logs`, {
      logGroupName: `/aws/lambda/${projectName}-Exporter-${stackEnv}`,
      retention: RetentionDays.ONE_MONTH,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const lambdaFunction = new DockerImageFunction(
      this,
      `${projectName}-Lambda-Exporter`,
      {
        functionName: `${projectName}-Exporter-${stackEnv}`,
        description:
          'Lambda used as Custom Resource by Web Stack to deploy CV to S3',
        environment: {
          PROJECT_NAME: projectName,
          CREATION_DATE: new Date().toISOString(),
          ENV: stackEnv,
          CLOUD_DEPLOYED: 'true',
          CV_URL: `cv.${AWS_DOMAIN_NAME}`,
        },
        currentVersionOptions: {
          removalPolicy: RemovalPolicy.RETAIN,
          retryAttempts: 1,
        },
        logGroup,
        role: lambdaRole,
        memorySize: 5120,
        timeout: Duration.seconds(30),
        architecture: Architecture.X86_64,
        code: DockerImageCode.fromEcr(repository, { tagOrDigest: 'latest' }),
      }
    );

    const alias = new Alias(this, `${projectName}-Exporter-Alias-${stackEnv}`, {
      aliasName: stackEnv,
      version: lambdaFunction.currentVersion,
    });

    SSMUtil.createSSMParameter({
      scope: this,
      stackEnv,
      projectName,
      paramName: PARAM_LAMBDA_CV_EXPORT_ALIAS_ARN,
      value: alias.functionArn,
    });
  }
}
