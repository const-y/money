import { FC } from 'react';
import ExpensesByCurrenciesChart from './ExpensesByCurrenciesChart';
import { Loader } from 'semantic-ui-react';
import { useQuery } from 'react-query';
import queries from '@/constants/queries';
import { getExpensesBuCurrenciesReport } from '@/api/reports';

const ExpensesByCurrencies: FC = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const { data, isLoading } = useQuery(
    queries.EXPENSES_BY_CURRENCIES_REPORT,
    () => getExpensesBuCurrenciesReport(currentYear)
  );

  if (isLoading || !data) {
    return <Loader active />;
  }

  return <ExpensesByCurrenciesChart data={data} />;
};

export default ExpensesByCurrencies;
