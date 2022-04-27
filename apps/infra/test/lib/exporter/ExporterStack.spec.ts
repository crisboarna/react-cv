import { App } from 'aws-cdk-lib';
import { PROJECT_NAME } from '../../../src/config';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as path from 'path';
import {
  artifactPathCvExport,
  lambdaCvExport,
} from '../../../src/config/lambda';
import {
  CDKDirectoryUtil,
  ILambdaUtilStackProps,
  LambdaUtilStack,
} from 'aws-cdk-lib-util';
import { getApiIAMPolicies } from '../../../src/lib/exporter/util';

CDKDirectoryUtil.checkArtifactDirectoryExists(
  path.resolve(__dirname, artifactPathCvExport)
);

describe('ExporterStack', function () {
  // given
  let app;
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';
  const stackProps: ILambdaUtilStackProps = {
    env: { account: '123456789123', region: 'us-east-1' },
    projectName,
    lambda: lambdaCvExport,
    stackEnv,
  };

  beforeEach(() => {
    app = new App();
  });

  test('stack missing IAM properties', () => {
    // given
    const stackPropsTest: ILambdaUtilStackProps = {
      ...stackProps,
      lambda: {
        ...lambdaCvExport,
        policies: (env, stackEnv) =>
          getApiIAMPolicies('test')(env, PROJECT_NAME, stackEnv),
      },
    };

    // when
    const stack = new LambdaUtilStack(app, 'ExporterStack', stackPropsTest);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
        Version: '2012-10-17',
      },
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/AWSXrayWriteOnlyAccess',
            ],
          ],
        },
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            ],
          ],
        },
      ],
      RoleName: `${projectName}-Exporter-Role-${stackEnv}`,
    });

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'sqs:SendMessage',
            Effect: 'Allow',
            Resource: {
              'Fn::GetAtt': [Match.anyValue(), 'Arn'],
            },
          },
          {
            Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
            Effect: 'Allow',
            Resource: '*',
          },
        ],
        Version: '2012-10-17',
      },
    });

    template.hasResourceProperties('AWS::SQS::Queue', {
      KmsMasterKeyId: 'alias/aws/sqs',
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      DeadLetterConfig: {
        TargetArn: {
          'Fn::GetAtt': [Match.anyValue(), 'Arn'],
        },
      },
      Description: `Lambda containing CV-Exporter API functionality`,
      Environment: {
        Variables: {
          APP_NAME: 'Exporter',
          CLOUD_DEPLOYED: 'true',
          CREATION_DATE: Match.anyValue(),
          CV_URL: 'cv.test.com',
          ENV: stackEnv,
          PROJECT_NAME: 'CV',
          REGION: 'us-east-1',
        },
      },
      FunctionName: `CV-Exporter-${stackEnv}`,
      Handler: 'main.handler',
      Layers: [
        {
          Ref: Match.anyValue(),
        },
      ],
      MemorySize: 1024,
      Runtime: 'nodejs14.x',
      Timeout: 25,
      TracingConfig: {
        Mode: 'Active',
      },
    });

    template.resourceCountIs('AWS::Lambda::Alias', 1);

    template.hasResourceProperties('AWS::Lambda::Permission', {
      Action: 'lambda:InvokeFunction',
      FunctionName: {
        Ref: Match.anyValue(),
      },
      Principal: 'cloudformation.amazonaws.com',
    });

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      AlarmActions: [
        {
          Ref: Match.anyValue(),
        },
      ],
      AlarmDescription: 'Alarm that monitors CV-Exporter DLQ Depth',
      AlarmName: `CV-Exporter-${stackEnv}-DLQ`,
      Dimensions: [
        {
          Name: 'QueueName',
          Value: {
            'Fn::GetAtt': [Match.anyValue(), 'QueueName'],
          },
        },
      ],
      MetricName: 'ApproximateNumberOfMessagesVisible',
      Namespace: 'AWS/SQS',
      Period: 300,
      Statistic: 'Maximum',
      Threshold: 1,
      TreatMissingData: 'notBreaching',
    });

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      AlarmActions: [
        {
          Ref: Match.anyValue(),
        },
      ],
      AlarmDescription:
        'Alarm that monitors CV-Exporter Errors and performs deployment rollback on release',
      AlarmName: `CV-Exporter-${stackEnv}-Error`,
      Dimensions: [
        {
          Name: 'FunctionName',
          Value: {
            Ref: Match.anyValue(),
          },
        },
        {
          Name: 'Resource',
          Value: {
            'Fn::Join': [
              '',
              [
                {
                  Ref: Match.anyValue(),
                },
                `:${stackEnv}`,
              ],
            ],
          },
        },
      ],
      MetricName: 'Errors',
      Namespace: 'AWS/Lambda',
      Period: 300,
      Statistic: 'Sum',
      Threshold: 1,
      TreatMissingData: 'notBreaching',
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: 'CV',
      Name: `/cv/lambda/alias/arn/exporter/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: 'CV',
      Name: `/cv/lambda/role/arn/exporter/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });

  test('stack configured properly', () => {
    // when
    const stack = new LambdaUtilStack(app, 'ExporterStack', stackProps);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
        Version: '2012-10-17',
      },
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/AWSXrayWriteOnlyAccess',
            ],
          ],
        },
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            ],
          ],
        },
      ],
      RoleName: `${projectName}-Exporter-Role-${stackEnv}`,
    });

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:PutObject',
            Effect: 'Allow',
            Resource: 'arn:aws:s3:::cv.test.com/Cristian Boarna CV.pdf',
          },
          {
            Action: 'sqs:SendMessage',
            Effect: 'Allow',
            Resource: {
              'Fn::GetAtt': [Match.anyValue(), 'Arn'],
            },
          },
          {
            Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
            Effect: 'Allow',
            Resource: '*',
          },
        ],
        Version: '2012-10-17',
      },
    });

    template.hasResourceProperties('AWS::SQS::Queue', {
      KmsMasterKeyId: 'alias/aws/sqs',
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      DeadLetterConfig: {
        TargetArn: {
          'Fn::GetAtt': [Match.anyValue(), 'Arn'],
        },
      },
      Description: `Lambda containing CV-Exporter API functionality`,
      Environment: {
        Variables: {
          APP_NAME: 'Exporter',
          CLOUD_DEPLOYED: 'true',
          CREATION_DATE: Match.anyValue(),
          ENV: stackEnv,
          CV_URL: 'cv.test.com',
          PROJECT_NAME: 'CV',
          REGION: 'us-east-1',
        },
      },
      FunctionName: `CV-Exporter-${stackEnv}`,
      Handler: 'main.handler',
      Layers: [
        {
          Ref: Match.anyValue(),
        },
      ],
      MemorySize: 1024,
      Runtime: 'nodejs14.x',
      Timeout: 25,
      TracingConfig: {
        Mode: 'Active',
      },
    });

    template.resourceCountIs('AWS::Lambda::Alias', 1);

    template.hasResourceProperties('AWS::Lambda::Permission', {
      Action: 'lambda:InvokeFunction',
      FunctionName: {
        Ref: Match.anyValue(),
      },
      Principal: 'cloudformation.amazonaws.com',
    });

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      AlarmActions: [
        {
          Ref: Match.anyValue(),
        },
      ],
      AlarmDescription: 'Alarm that monitors CV-Exporter DLQ Depth',
      AlarmName: `CV-Exporter-${stackEnv}-DLQ`,
      Dimensions: [
        {
          Name: 'QueueName',
          Value: {
            'Fn::GetAtt': [Match.anyValue(), 'QueueName'],
          },
        },
      ],
      MetricName: 'ApproximateNumberOfMessagesVisible',
      Namespace: 'AWS/SQS',
      Period: 300,
      Statistic: 'Maximum',
      Threshold: 1,
      TreatMissingData: 'notBreaching',
    });

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      AlarmActions: [
        {
          Ref: Match.anyValue(),
        },
      ],
      AlarmDescription:
        'Alarm that monitors CV-Exporter Errors and performs deployment rollback on release',
      AlarmName: `CV-Exporter-${stackEnv}-Error`,
      Dimensions: [
        {
          Name: 'FunctionName',
          Value: {
            Ref: Match.anyValue(),
          },
        },
        {
          Name: 'Resource',
          Value: {
            'Fn::Join': [
              '',
              [
                {
                  Ref: Match.anyValue(),
                },
                `:${stackEnv}`,
              ],
            ],
          },
        },
      ],
      MetricName: 'Errors',
      Namespace: 'AWS/Lambda',
      Period: 300,
      Statistic: 'Sum',
      Threshold: 1,
      TreatMissingData: 'notBreaching',
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: 'CV',
      Name: `/cv/lambda/alias/arn/exporter/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: 'CV',
      Name: `/cv/lambda/role/arn/exporter/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });
});
