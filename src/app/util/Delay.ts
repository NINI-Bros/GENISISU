// eslint-disable-next-line require-await
export default async function DelayTests(count: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, count);
  });
}
