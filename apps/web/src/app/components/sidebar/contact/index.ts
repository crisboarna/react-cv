export { default } from './contact';

export type ContactProps = {
  readonly email?: Record<string, string>;
  readonly phone?: Record<string, string>;
  readonly website?: Record<string, string>;
  readonly linkedin?: Record<string, string>;
  readonly github?: Record<string, string>;
  readonly blog?: Record<string, string>;
};
