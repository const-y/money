export default function assertIsDate(value: unknown): asserts value is Date {
  if (!(value instanceof Date)) {
    throw Error('Значение не является датой');
  }
}
