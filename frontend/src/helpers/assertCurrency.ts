import { Currency } from '@/api/exchangeRates';

export default function assertCurrency(
  value: string
): asserts value is Currency {
  if (value !== 'RUB' && value !== 'USD' && value !== 'GEL') {
    throw Error(`Неподдерживаемая валюта "${value}"`);
  }
}
