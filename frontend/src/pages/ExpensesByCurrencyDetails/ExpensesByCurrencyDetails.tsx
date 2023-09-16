import {
  GetExpensesBuCurrenciesDetailsReportArg,
  getExpensesBuCurrenciesDetailsReport,
} from '@/api/reports';
import queries from '@/constants/queries';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Header, Icon, Loader } from 'semantic-ui-react';
import ExpensesByCurrencyDetailsChart from './ExpensesByCurrencyDetailsChart';
import routes from '@/constants/routes';

const ExpensesByCurrencyDetails: FC = () => {
  const { currency, year, month } = useParams();
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate(`/${routes.EXPENSES_BY_CURRENCIES_REPORT}`);
  };

  const header = `Детализация расходов (${currency}) ${year}-${month}`;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Section link onClick={handleBack}>
          Расходы по валютам
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{header}</Breadcrumb.Section>
      </Breadcrumb>
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
