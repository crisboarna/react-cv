import { NameProps } from './name';
import { SkillsProps } from './skills';
import { CertificationProps } from './certifications';
import { ContactProps } from './contact';
import { EducationProps } from './education';
import { InterestProps } from './interests';
import { LanguageProps } from './language';

export { default } from './sidebar';

export type SidebarProps = {
  readonly name?: NameProps;
  readonly contact?: ContactProps;
  readonly education?: EducationProps;
  readonly languages?: LanguageProps;
  readonly interests?: InterestProps;
  readonly certifications?: CertificationProps;
  readonly skills?: SkillsProps;
};
