import { App } from 'aws-cdk-lib';
import { PROJECT_NAME } from '../../../src/config';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { EcrStackProps } from '../../../src/interfaces';
import { ExporterStack } from '../../../src/lib/exporter/ExporterStack';

describe('ExporterStack', function () {
  // given
  let app;
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';
  const stackProps: EcrStackProps = {
    env: { account: '123456789123', region: 'us-east-1' },
    projectName,
    ecrRepoName: 'ecrRepoName',
    stackEnv,
  };

  beforeEach(() => {
    app = new App();
  });

  test('stack configured properly', () => {
    // when
    const stack = new ExporterStack(app, 'ExporterStack', stackProps);

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
            Action: [
              'ecr:BatchCheckLayerAvailability',
              'ecr:GetDownloadUrlForLayer',
              'ecr:BatchGetImage',
            ],
            Effect: 'Allow',
            Resource: {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition',
                  },
                  ':ecr:us-east-1:123456789123:repository/ecrRepoName',
                ],
              ],
            },
          },
          {
            Action: 'ecr:GetAuthorizationToken',
            Effect: 'Allow',
            Resource: '*',
          },
          // {
          //   Action: 's3:PutObject',
          //   Effect: 'Allow',
          //   Resource: 'arn:aws:s3:::cv.test.com/Boarna Cristian CV.pdf',
          // },
        ],
        Version: '2012-10-17',
      },
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      Description:
        'Lambda used as Custom Resource by Web Stack to deploy CV to S3',
      Environment: {
        Variables: {
          CLOUD_DEPLOYED: 'true',
          CREATION_DATE: Match.anyValue(),
          ENV: stackEnv,
          CV_URL: 'cv.test.com',
          PROJECT_NAME: 'CV',
        },
      },
      FunctionName: `CV-Exporter-${stackEnv}`,
      MemorySize: 5120,
      Timeout: 30,
    });

    template.resourceCountIs('AWS::Lambda::Alias', 1);

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: 'CV',
      Name: `/cv/lambda/alias/arn/exporter/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });
});
