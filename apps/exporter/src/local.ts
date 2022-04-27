import { handler } from './main';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
handler({} as any)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .then(() => console.log('Done.'))
  .catch((err) => console.error(err));
