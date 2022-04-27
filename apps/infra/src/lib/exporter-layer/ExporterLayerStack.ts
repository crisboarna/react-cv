import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ExporterLayerStackProps } from '../../interfaces';
import {
  Architecture,
  AssetCode,
  LayerVersion,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { SSMUtil } from 'aws-cdk-lib-util';

export class ExporterLayerStack extends Stack {
  constructor(scope: Construct, id: string, props?: ExporterLayerStackProps) {
    super(scope, id, props);

    const { artifactPath, layerParamName, projectName, stackEnv } = props;

    const layer = new LayerVersion(
      this,
      `${projectName}-Puppeteer-Layer-${stackEnv}`,
      {
        code: AssetCode.fromAsset(artifactPath),
        layerVersionName: `${projectName}-Puppeteer-Layer-${stackEnv}`,
        compatibleArchitectures: [Architecture.X86_64],
        compatibleRuntimes: [Runtime.NODEJS],
        description:
          'Contains puppeteer-core & dependencies needed for CV exporter',
      }
    );

    SSMUtil.createSSMParameter({
      scope: this,
      stackEnv,
      projectName,
      paramName: layerParamName,
      value: layer.layerVersionArn,
    });
  }
}
