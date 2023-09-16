import {
  GetExpensesBuCurrenciesDetailsReportArg,
  getExpensesBuCurrenciesDetailsReport,
} from '@/api/reports';
import queries from '@/constants/queries';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Params, useParams } from 'react-router-dom';
import { Header, Loader } from 'semantic-ui-react';
import ExpensesByCurrencyDetailsBreadcrumb from './ExpensesByCurrencyDetailsBreadcrumb';
import ExpensesByCurrencyDetailsChart from './ExpensesByCurrencyDetailsChart';

const ExpensesByCurrencyDetails: FC = () => {
  const { currency, year, month } = useParams();
  const header = `Детализация расходов (${currency}) ${year}-${month}`;

  const { data, isLoading } = useQuery(
    queries.EXPENSES_BY_CURRENCIES_REPORT,
    () =>
      getExpensesBuCurrenciesDetailsReport(
        getRequestArg({ currency, year, month })
      )
  );

  if (isLoading || !data) {
    return <Loader active />;
  }

  return (
    <>
      <ExpensesByCurrencyDetailsBreadcrumb header={header} />
      <Header as="h1">{header}</Header>
      <ExpensesByCurrencyDetailsChart data={data} />
    </>
  );
};

function getRequestArg({
  currency,
  year,
  month,
}: Params<string>): GetExpensesBuCurrenciesDetailsReportArg {
  if (!currency) throw new Error('Отсутствует валюта');
  if (!year) throw new Error('Отсутствует год');
  if (!month) throw new Error('Отсутствует месяц');

  return { currency, year: Number(year), month: Number(month) };
}

export default ExpensesByCurrencyDetails;
