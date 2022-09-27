import { handler } from './main';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
handler({} as any)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
