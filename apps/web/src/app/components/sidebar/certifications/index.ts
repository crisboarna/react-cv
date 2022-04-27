export { default } from './certifications';

export type CertificationItem = {
  readonly name: string;
  readonly icon: string;
  readonly description: string;
};

export type CertificationProps = {
  readonly title?: string;
  readonly list?: CertificationItem[];
};
