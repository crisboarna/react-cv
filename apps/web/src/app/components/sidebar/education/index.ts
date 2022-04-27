export { default } from './education';

export type EducationItem = {
  readonly icon: string;
  readonly degree: string;
  readonly school: string;
  readonly date: string;
  readonly courses: string[];
};

export type EducationProps = {
  readonly title: string;
  readonly list: EducationItem[];
};
