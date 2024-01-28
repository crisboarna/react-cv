import { Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';
import { EcrStackProps } from '../../../src/interfaces';
import { EcrStack } from '../../../src/lib/ecr/EcrStack';

test('EcrStack', () => {
  // given
  const app = new App();
  const projectName = 'projectName';
  const ecrRepoName = 'ecreponame';
  const stackEnv = 'stackEnv';
  const stackProps: EcrStackProps = {
    env: { account: '123456789123', region: 'us-east-1' },
    projectName,
    stackEnv,
    ecrRepoName,
  };

  // when
  const stack = new EcrStack(app, 'EcrStack', stackProps);

  // then
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::ECR::Repository', 1);
  template.hasResourceProperties('AWS::ECR::Repository', {
    EmptyOnDelete: false,
    ImageScanningConfiguration: {
      ScanOnPush: true,
    },
    LifecyclePolicy: {
      LifecyclePolicyText:
        '{"rules":[{"rulePriority":1,"selection":{"tagStatus":"any","countType":"imageCountMoreThan","countNumber":1},"action":{"type":"expire"}}]}',
    },
    RepositoryName: ecrRepoName,
  });
});
