import { Match, Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';
import { WebStack } from '../../../src/lib/web/WebStack';
import { WebStackProps } from '../../../src/interfaces';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';

const artifactPath = '/tmp/test';
CDKDirectoryUtil.checkArtifactDirectoryExists(artifactPath);

describe('WebStack', () => {
  let app;
  const domainCertParamName = 'domainCertParamName';
  const domainName = 'domainname';
  const exporterFnParamName = 'exporterFnParamName';
  const projectName = 'projectName';
  const projectNameMain = 'projectNameMain';
  const stackProps: WebStackProps = {
    artifactPath,
    env: { account: '123456789123', region: 'us-east-1' },
    domainCertParamName,
    domainName,
    exporterFnParamName,
    projectName,
    projectNameMain,
  };

  beforeEach(() => (app = new App()));

  test('prod stackEnv', () => {
    const stackEnv = 'PROD';
    const stackPropsTest = { ...stackProps, stackEnv };

    // when
    const stack = new WebStack(app, 'WebStack', stackPropsTest);

    // then
    const template = Template.fromStack(stack);

    // template.resourceCountIs('AWS::WAFv2::WebACL', 1);
    // template.hasResourceProperties('AWS::WAFv2::WebACL', {
    //   Name: `${projectName}-WAF-${stackEnv}`,
    //   Scope: 'CLOUDFRONT',
    //   DefaultAction: {
    //     Allow: {},
    //   },
    //   VisibilityConfig: {
    //     CloudWatchMetricsEnabled: true,
    //     MetricName: `${projectName.toLowerCase()}-waf-access-${stackEnv.toLowerCase()}`,
    //     SampledRequestsEnabled: true,
    //   },
    // });

    template.resourceCountIs(
      'AWS::CloudFront::CloudFrontOriginAccessIdentity',
      1
    );
    template.resourceCountIs('AWS::S3::Bucket', 1);

    template.hasResource('AWS::S3::Bucket', {
      UpdateReplacePolicy: 'Retain',
      DeletionPolicy: 'Retain',
    });

    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
            },
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });

    template.resourceCountIs('AWS::S3::BucketPolicy', 1);

    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:*',
            Condition: {
              Bool: {
                'aws:SecureTransport': 'false',
              },
            },
            Effect: 'Deny',
            Principal: {
              AWS: '*',
            },
            Resource: [
              {
                'Fn::GetAtt': [Match.anyValue(), 'Arn'],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          },
          {
            Action: 's3:ListBucket',
            Effect: 'Allow',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': [Match.anyValue(), 'S3CanonicalUserId'],
              },
            },
            Resource: {
              'Fn::GetAtt': [Match.anyValue(), 'Arn'],
            },
          },
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': [Match.anyValue(), 'S3CanonicalUserId'],
              },
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                  },
                  '/*',
                ],
              ],
            },
          },
          {
            Action: 's3:GetObject',
            Effect: 'Deny',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': [Match.anyValue(), 'S3CanonicalUserId'],
              },
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                  },
                  '/logs/*',
                ],
              ],
            },
          },
        ],
        Version: '2012-10-17',
      },
    });

    template.resourceCountIs('AWS::CloudFront::Distribution', 1);
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [`cv.${domainName}`],
        Comment: `${projectName}${stackEnv}`,
        CustomErrorResponses: [
          {
            ErrorCachingMinTTL: 1800,
            ErrorCode: 403,
            ResponseCode: 200,
            ResponsePagePath: '/index.html',
          },
        ],
        DefaultCacheBehavior: {
          AllowedMethods: ['GET', 'HEAD', 'OPTIONS'],
          CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          Compress: true,
          OriginRequestPolicyId: '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf',
          ViewerProtocolPolicy: 'redirect-to-https',
        },
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        Origins: [
          {
            DomainName: {
              'Fn::GetAtt': [Match.anyValue(), 'RegionalDomainName'],
            },
            S3OriginConfig: {
              OriginAccessIdentity: {
                'Fn::Join': [
                  '',
                  [
                    'origin-access-identity/cloudfront/',
                    {
                      Ref: Match.anyValue(),
                    },
                  ],
                ],
              },
            },
          },
        ],
        ViewerCertificate: {
          AcmCertificateArn: {
            Ref: Match.anyValue(),
          },
          MinimumProtocolVersion: 'TLSv1.2_2021',
          SslSupportMethod: 'sni-only',
        },
        // WebACLId: {
        //   'Fn::GetAtt': [Match.anyValue(), 'Arn'],
        // },
      },
    });

    template.resourceCountIs('AWS::Route53::RecordSet', 1);
    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: `cv.${domainName}.`,
      Type: 'A',
      AliasTarget: {
        DNSName: {
          'Fn::GetAtt': [Match.anyValue(), 'DomainName'],
        },
      },
    });

    template.resourceCountIs('Custom::CDKBucketDeployment', 1);

    template.resourceCountIs('AWS::CloudFormation::CustomResource', 1);

    template.resourceCountIs('AWS::Lambda::Function', 2);

    template.resourceCountIs('AWS::SSM::Parameter', 1);

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/cdn/id/cv/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });

    template.resourceCountIs('AWS::IAM::Role', 2);

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
              ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            ],
          ],
        },
      ],
    });
  });

  test('non-prod stackEnv', () => {
    const stackEnv = 'stackEnv';

    // when
    const stack = new WebStack(app, 'WebStack', { ...stackProps, stackEnv });

    // then
    const template = Template.fromStack(stack);

    // template.resourceCountIs('AWS::WAFv2::WebACL', 1);
    // template.hasResourceProperties('AWS::WAFv2::WebACL', {
    //   Name: `${projectName}-WAF-${stackEnv}`,
    //   Scope: 'CLOUDFRONT',
    //   DefaultAction: {
    //     Allow: {},
    //   },
    //   VisibilityConfig: {
    //     CloudWatchMetricsEnabled: true,
    //     MetricName: `${projectName.toLowerCase()}-waf-access-${stackEnv.toLowerCase()}`,
    //     SampledRequestsEnabled: true,
    //   },
    // });

    template.resourceCountIs(
      'AWS::CloudFront::CloudFrontOriginAccessIdentity',
      1
    );
    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
            },
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });

    template.resourceCountIs('AWS::S3::BucketPolicy', 1);

    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:*',
            Condition: {
              Bool: {
                'aws:SecureTransport': 'false',
              },
            },
            Effect: 'Deny',
            Principal: {
              AWS: '*',
            },
            Resource: [
              {
                'Fn::GetAtt': [Match.anyValue(), 'Arn'],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          },
          {
            Action: ['s3:PutBucketPolicy', 's3:GetBucket*', 's3:List*', 's3:DeleteObject*'],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::GetAtt': [Match.anyValue(), 'Arn'],
              },
            },
            Resource: [
              {
                'Fn::GetAtt': [Match.anyValue(), 'Arn'],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          },
          {
            Action: 's3:ListBucket',
            Effect: 'Allow',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': [Match.anyValue(), 'S3CanonicalUserId'],
              },
            },
            Resource: {
              'Fn::GetAtt': [Match.anyValue(), 'Arn'],
            },
          },
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': [Match.anyValue(), 'S3CanonicalUserId'],
              },
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                  },
                  '/*',
                ],
              ],
            },
          },
          {
            Action: 's3:GetObject',
            Effect: 'Deny',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': [Match.anyValue(), 'S3CanonicalUserId'],
              },
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [Match.anyValue(), 'Arn'],
                  },
                  '/logs/*',
                ],
              ],
            },
          },
        ],
        Version: '2012-10-17',
      },
    });

    template.resourceCountIs('AWS::CloudFront::Distribution', 1);
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [`cv.${domainName}`],
        Comment: `${projectName}${stackEnv}`,
        CustomErrorResponses: [
          {
            ErrorCachingMinTTL: 1800,
            ErrorCode: 403,
            ResponseCode: 200,
            ResponsePagePath: '/index.html',
          },
        ],
        DefaultCacheBehavior: {
          AllowedMethods: ['GET', 'HEAD', 'OPTIONS'],
          CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          Compress: true,
          OriginRequestPolicyId: '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf',
          ViewerProtocolPolicy: 'redirect-to-https',
        },
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        Origins: [
          {
            DomainName: {
              'Fn::GetAtt': [Match.anyValue(), 'RegionalDomainName'],
            },
            S3OriginConfig: {
              OriginAccessIdentity: {
                'Fn::Join': [
                  '',
                  [
                    'origin-access-identity/cloudfront/',
                    {
                      Ref: Match.anyValue(),
                    },
                  ],
                ],
              },
            },
          },
        ],
        ViewerCertificate: {
          AcmCertificateArn: {
            Ref: Match.anyValue(),
          },
          MinimumProtocolVersion: 'TLSv1.2_2021',
          SslSupportMethod: 'sni-only',
        },
        // WebACLId: {
        //   'Fn::GetAtt': [Match.anyValue(), 'Arn'],
        // },
      },
    });

    template.resourceCountIs('AWS::Route53::RecordSet', 1);
    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: `cv.${domainName}.`,
      Type: 'A',
      AliasTarget: {
        DNSName: {
          'Fn::GetAtt': [`${projectName}CDN${stackEnv}248D431F`, 'DomainName'],
        },
      },
    });

    template.resourceCountIs('Custom::CDKBucketDeployment', 1);

    template.resourceCountIs('AWS::CloudFormation::CustomResource', 1);

    template.resourceCountIs('AWS::Lambda::Function', 3);

    template.resourceCountIs('AWS::SSM::Parameter', 1);

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/cdn/id/cv/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });

    template.resourceCountIs('AWS::IAM::Role', 3);

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
              ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            ],
          ],
        },
      ],
    });
  });
});
