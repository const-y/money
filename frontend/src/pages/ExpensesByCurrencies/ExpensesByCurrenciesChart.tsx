import { ExpensesByCurrenciesReportDataItem } from '@/api/reports';
import { FC, Fragment, useMemo } from 'react';
import { Header } from 'semantic-ui-react';
import ClickableBarChart from './ClickableBarChart';
import { useNavigate } from 'react-router-dom';
import routes from '@/constants/routes';

interface ExpensesByCurrenciesChartProps {
  data: ExpensesByCurrenciesReportDataItem[];
}

const LABELS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const ExpensesByCurrenciesChart: FC<ExpensesByCurrenciesChartProps> = ({
  data,
}) => {
  const datasetsMap = useMemo(() => getDatasetsMap(data), [data]);
  const navigate = useNavigate();

  const getChartData = (currency: string) => {
    const datasets = [
      {
        label: currency,
        data: datasetsMap[currency],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ];

    return {
      labels: LABELS,
      datasets,
    };
  };

  return (
    <>
      <Header as="h1">Расходы по валютам</Header>
      {Object.keys(datasetsMap).map((currency) => {
        const handleBarChartClick = (index: number) => {
          const month = index + 1;
          const year = new Date().getFullYear();

          navigate(
            `/${routes.EXPENSES_BY_CURRENCIES_REPORT}/${currency}/${year}/${month}`
          );
        };

        return (
          <Fragment key={currency}>
            <Header as="h2">{currency}</Header>
            <ClickableBarChart
              data={getChartData(currency)}
              onClick={handleBarChartClick}
            />
          </Fragment>
        );
      })}
    </>
  );
};

function getDatasetsMap(
  data: ExpensesByCurrenciesReportDataItem[]
): Record<string, number[]> {
  const map: Record<string, number[]> = {};

  data.forEach((item) => {
    if (!map[item.currency]) {
      map[item.currency] = LABELS.map(() => 0);
    }

    map[item.currency][item.month - 1] = Math.abs(item.totalAmount);
  });

  return map;
}

export default ExpensesByCurrenciesChart;
