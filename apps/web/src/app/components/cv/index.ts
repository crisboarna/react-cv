import { SidebarProps } from '../sidebar';
import { CategoryProps } from './category';

export { default } from './cv';

export type ProfileProps = {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
};

export type CVProps = {
  readonly sidebar?: SidebarProps;
  readonly profile?: ProfileProps;
  readonly projects?: CategoryProps;
  readonly experience?: CategoryProps;
};
