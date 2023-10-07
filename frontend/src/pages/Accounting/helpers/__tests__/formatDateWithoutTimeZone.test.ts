import formatDateWithoutTimeZone from '../formatDateWithoutTimeZone';

describe('formatDateWithoutTimeZone()', () => {
  it('should format the date without time zone', () => {
    const inputDate = new Date('2023-10-07T12:34:56Z'); // UTC time
    const formattedDate = formatDateWithoutTimeZone(inputDate);
    expect(formattedDate).toBe('2023-10-07');
  });

  it('should format the date correctly for different input', () => {
    const inputDate = new Date('2022-05-15T18:45:00Z'); // UTC time
    const formattedDate = formatDateWithoutTimeZone(inputDate);
    expect(formattedDate).toBe('2022-05-15');
  });

  it('should handle single-digit month and day', () => {
    const inputDate = new Date('2023-02-01T00:00:00Z'); // UTC time
    const formattedDate = formatDateWithoutTimeZone(inputDate);
    expect(formattedDate).toBe('2023-02-01');
  });
});
