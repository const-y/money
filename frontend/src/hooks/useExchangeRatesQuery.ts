import { getExchangeRateList } from '@/api/exchangeRates';
import queries from '@/constants/queries';
import { useQuery } from 'react-query';

const useExchangeRatesQuery = () =>
  useQuery(queries.EXCHANGE_RATES, getExchangeRateList);

export default useExchangeRatesQuery;
