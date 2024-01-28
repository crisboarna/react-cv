import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcrStackProps } from '../../interfaces';
import { Repository } from 'aws-cdk-lib/aws-ecr';

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props?: EcrStackProps) {
    super(scope, id, props);

    const { ecrRepoName: repositoryName, projectName, stackEnv } = props;

    new Repository(this, `${projectName}-ECR-Exporter-${stackEnv}`, {
      repositoryName,
      imageScanOnPush: true,
      emptyOnDelete: false,
      lifecycleRules: [
        {
          maxImageCount: 1,
        },
      ],
    });
  }
}
