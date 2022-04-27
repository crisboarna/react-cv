export { default } from './skills';

export type SkillsProps = {
  readonly title: string;
  readonly list: Record<string, Array<string>>;
};
