export default function formatDate(originalDate: string) {
  const dateObj = new Date(originalDate);
  return dateObj.toLocaleDateString();
}
