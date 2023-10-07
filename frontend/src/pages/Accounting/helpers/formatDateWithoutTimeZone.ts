export default function formatDateWithoutTimeZone(date: Date) {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const targetDate = new Date(date.getTime() - userTimezoneOffset);

  return targetDate.toISOString().substring(0, 10);
}
