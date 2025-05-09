export default function assertIsString(
  value: unknown
): asserts value is string {
  if (typeof value !== 'string') {
    throw Error(`Значение "${value}" не является строкой`);
  }
}
