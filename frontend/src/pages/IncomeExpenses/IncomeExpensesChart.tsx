import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Доходы и расходы',
    },
  },
};

const labels = [''];

interface IncomeExpensesChartProps {
  income: number;
  expenses: number;
}

const IncomeExpensesChart: FC<IncomeExpensesChartProps> = ({
  income,
  expenses,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Доходы',
        data: [income],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Расходы',
        data: [expenses],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default IncomeExpensesChart;
