import { ExpensesBuCurrenciesDetailsReportItem } from '@/api/reports';
import { FC, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import randomColor from 'randomcolor';

interface ExpensesByCurrencyDetailsChartProps {
  data: ExpensesBuCurrenciesDetailsReportItem[];
}

const ExpensesByCurrencyDetailsChart: FC<
  ExpensesByCurrencyDetailsChartProps
> = ({ data }) => {
  const chartData = useMemo(() => getChartData(data), [data]);

  return (
    <div style={{ width: '500px', margin: '0 auto' }}>
      <Pie data={chartData} />
    </div>
  );
};

function getChartData(data: ExpensesBuCurrenciesDetailsReportItem[]) {
  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.totalAmount),
        backgroundColor: data.map(() => randomColor()),
        borderWidth: 1,
      },
    ],
  };
}

export default ExpensesByCurrencyDetailsChart;
