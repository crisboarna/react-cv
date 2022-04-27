export { default } from './category';

export type ExperienceItem = {
  readonly title: string;
  readonly subtitle: string;
  readonly subtitleDetail?: string;
  readonly subtitleLink?: string;
  readonly date?: string;
  readonly description: string[];
  readonly tags: string[];
};

export type CategoryProps = {
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly list?: Array<ExperienceItem>;
};
