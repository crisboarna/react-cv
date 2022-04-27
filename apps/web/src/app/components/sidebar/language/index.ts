export { default } from './language';

export type LanguageItem = {
  readonly name: string;
  readonly level: string;
};

export type LanguageProps = {
  readonly title: string;
  readonly list: LanguageItem[];
};
