import { getAccountTypes } from '@/api/accountTypes';
import { getIncomeExpensesReport } from '@/api/reports';
import queries from '@/constants/queries';
import { FC } from 'react';
import { useQuery } from 'react-query';
import IncomeExpensesChart from './IncomeExpensesChart';
import { Loader } from 'semantic-ui-react';

interface IncomeExpensesReportViewProps {
  from: Date;
  to: Date;
}

const IncomeExpensesReportView: FC<IncomeExpensesReportViewProps> = ({
  from,
  to,
}) => {
  const { data, isLoading } = useQuery(queries.INCOME_EXPENSES_REPORT, () =>
    getIncomeExpensesReport({
      from: from.toISOString(),
      to: to.toISOString(),
    })
  );

  if (!data || isLoading) {
    return <Loader active />;
  }

  return (
    <IncomeExpensesChart income={data?.income} expenses={data?.expenses} />
  );
};

export default IncomeExpensesReportView;
