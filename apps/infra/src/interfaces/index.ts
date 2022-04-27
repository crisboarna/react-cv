import { IBaseStackProps } from '../utils/interfaces';

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

export type WebStackProps = IWebProps & IBaseStackProps;
