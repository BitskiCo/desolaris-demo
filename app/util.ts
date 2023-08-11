export function expect<T>(v: T | null | undefined): T {
  if (v === null || v === undefined) {
    throw new Error('Expected value to be defined');
  }

  return v;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
