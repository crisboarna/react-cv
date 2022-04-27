import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebStackProps } from '../../interfaces';
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
} from 'aws-cdk-lib/aws-s3';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import {
  AllowedMethods,
  Distribution,
  HttpVersion,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import {
  BucketDeployment,
  Source,
  StorageClass,
} from 'aws-cdk-lib/aws-s3-deployment';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';
import { wafRules } from './util';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ENV, PARAM_CDN_ID_CV } from '../../config';
import { CDKCustomResourceUtil, SSMUtil } from 'aws-cdk-lib-util';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class WebStack extends Stack {
  constructor(scope: Construct, id: string, props?: WebStackProps) {
    super(scope, id, props);

    const {
      artifactPath,
      domainCertParamName,
      domainName,
      exporterFnParamName,
      projectName,
      projectNameMain,
      stackEnv,
    } = props;

    const [domainCertArn, exporterFnArn] = [
      `/${projectNameMain.toLowerCase()}${domainCertParamName}`,
      exporterFnParamName,
    ].map(
      (paramName) => <string>SSMUtil.getSSMParameter({
          scope: this,
          projectName,
          stackEnv,
          paramName,
        })
    );

    const certificate = Certificate.fromCertificateArn(
      this,
      `${projectName}-CDN-ACM-Cert-Import-${stackEnv}`,
      domainCertArn
    );

    const wafv2 = new CfnWebACL(this, `${projectName}-WAF-${stackEnv}`, {
      name: `${projectName}-WAF-${stackEnv}`,
      description: `WAF for ${projectName} API`,
      scope: 'CLOUDFRONT',
      defaultAction: {
        allow: {},
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: `${projectName.toLowerCase()}-waf-access-${stackEnv.toLowerCase()}`,
        sampledRequestsEnabled: true,
      },
      rules: wafRules(projectName, stackEnv),
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      `${projectName}-CDN-CV-OAI-${stackEnv}`,
      {
        comment: 'OAI used by CDN for CV S3 bucket',
      }
    );

    const bucket = new Bucket(this, `${projectName}-S3-Bucket-${stackEnv}`, {
      bucketName: `cv.${domainName}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy:
        stackEnv !== ENV.PROD ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
      autoDeleteObjects: stackEnv !== ENV.PROD,
      encryption: BucketEncryption.S3_MANAGED,
      serverAccessLogsPrefix: 'logs/bucket',
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:ListBucket'],
        resources: [bucket.bucketArn],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );
    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );
    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.DENY,
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/logs/*`],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );

    const cdnDistribution = new Distribution(
      this,
      `${projectName}-CDN-${stackEnv}`,
      {
        comment: `${projectName}${stackEnv}`,
        webAclId: wafv2.attrArn,
        enabled: true,
        httpVersion: HttpVersion.HTTP2,
        certificate,
        domainNames: [`cv.${domainName}`],
        defaultRootObject: 'index.html',
        enableLogging: true,
        logBucket: bucket,
        logFilePrefix: 'logs/cdn',
        minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
        defaultBehavior: {
          origin: new S3Origin(bucket, { originAccessIdentity }),
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          compress: true,
          originRequestPolicy: {
            //CORS-S3Origin
            originRequestPolicyId: '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf',
          },
        },
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: Duration.minutes(30),
          },
        ],
      }
    );

    const zone = HostedZone.fromLookup(
      this,
      `${projectName}-R53-Zone-${stackEnv}`,
      {
        domainName,
      }
    );

    new ARecord(this, `${projectName}-R53-A-${stackEnv}`, {
      zone,
      recordName: 'cv',
      target: RecordTarget.fromAlias(new CloudFrontTarget(cdnDistribution)),
    });

    const deployment = new BucketDeployment(
      this,
      `${projectName}-S3-Deployment-${stackEnv}`,
      {
        sources: [Source.asset(artifactPath)],
        destinationBucket: bucket,
        distribution: cdnDistribution,
        memoryLimit: 256,
        storageClass: StorageClass.STANDARD_IA,
      }
    );

    const cvExporter = CDKCustomResourceUtil.actionViaCustomResource({
      scope: this,
      projectName,
      stackEnv,
      functionArn: exporterFnArn,
      resourceProperties: { invocation: new Date().toISOString() },
    });

    cvExporter.node.addDependency(deployment);

    SSMUtil.createSSMParameter({
      scope: this,
      stackEnv,
      projectName,
      paramName: PARAM_CDN_ID_CV,
      value: cdnDistribution.distributionId,
    });
  }
}
