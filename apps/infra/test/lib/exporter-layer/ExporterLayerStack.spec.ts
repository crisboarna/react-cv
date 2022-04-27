import { Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';
import { ExporterLayerStackProps } from '../../../src/interfaces';
import { ARTIFACT_PATH_EXPORTER_LAYER } from '../../../src/config';
import { ExporterLayerStack } from '../../../src/lib/exporter-layer/ExporterLayerStack';
import * as path from 'path';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';

const artifactPath = path.resolve(__dirname, ARTIFACT_PATH_EXPORTER_LAYER);
CDKDirectoryUtil.checkArtifactFileExists(artifactPath);

test('ExporterLayerStack', () => {
  // given
  const app = new App();
  const projectName = 'projectName';
  const layerParamName = 'layerParamName';
  const stackEnv = 'stackEnv';
  const stackProps: ExporterLayerStackProps = {
    artifactPath,
    env: { account: '123456789123', region: 'us-east-1' },
    projectName,
    layerParamName,
    stackEnv,
  };

  // when
  const stack = new ExporterLayerStack(app, 'ExporterLayerStack', stackProps);

  // then
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::LayerVersion', {
    CompatibleArchitectures: ['x86_64'],
    CompatibleRuntimes: ['nodejs'],
    LayerName: `${projectName}-Puppeteer-Layer-${stackEnv}`,
  });

  template.hasResourceProperties('AWS::SSM::Parameter', {
    Type: 'String',
    Description: projectName,
    Name: `/${projectName.toLowerCase()}/${layerParamName}${stackEnv.toLowerCase()}`,
    Tier: 'Standard',
  });
});
