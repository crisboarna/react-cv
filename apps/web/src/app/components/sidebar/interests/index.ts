export { default } from './interests';

export type InterestItem = {
  readonly name: string;
  readonly description: string;
};

export type InterestProps = {
  readonly title: string;
  readonly list: InterestItem[];
};
