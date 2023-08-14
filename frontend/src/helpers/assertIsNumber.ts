export default function assertIsNumber(
  value: unknown
): asserts value is number {
  if (typeof value !== 'number') {
    throw Error(`Значение "${value}" не является числом`);
  }
}
