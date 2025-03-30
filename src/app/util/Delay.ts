// eslint-disable-next-line require-await
export const delayTests = async (count: number) =>
  new Promise((resolve) => setTimeout(resolve, count));
