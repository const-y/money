export default function formatCurrency(
  amount: number,
  currency: string,
  locale: string = 'ru-RU'
): string {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
  });
}
