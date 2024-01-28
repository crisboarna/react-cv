import { IBaseStackProps } from 'aws-cdk-lib-util';

export type IExporterLayerProps = {
  readonly artifactPath: string;
  readonly layerParamName: string;
};

export type IWebProps = {
  readonly artifactPath: string;
  readonly domainName: string;
  readonly domainCertParamName: string;
  readonly exporterFnParamName: string;
  readonly projectNameMain: string;
};

export type ExporterLayerStackProps = IExporterLayerProps & IBaseStackProps;
export type EcrStackProps = IBaseStackProps & { readonly ecrRepoName: string };

export type WebStackProps = IWebProps & IBaseStackProps;
