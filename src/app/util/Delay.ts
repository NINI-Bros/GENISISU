export const delayTests = async (count: number) =>
  new Promise((resolve) => setTimeout(resolve, count));
