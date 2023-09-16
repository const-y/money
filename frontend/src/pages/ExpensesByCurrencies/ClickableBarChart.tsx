import { Chart, ChartData } from 'chart.js';
import { FC, MouseEvent, useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';

interface ClickableBarChartProps {
  data: ChartData<'bar'>;
  onClick: (index: number) => void;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ClickableBarChart: FC<ClickableBarChartProps> = ({ data, onClick }) => {
  const chartRef = useRef<Chart<'bar'> | null>(null);

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) return;

    const element = getElementAtEvent(chart, event);

    if (!element.length) return;

    onClick(element[0].index);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) return;

    const element = getElementAtEvent(chart, event);
    chart.canvas.style.cursor = element.length ? 'pointer' : 'auto';
  };

  return (
    <Bar
      ref={chartRef}
      options={options}
      data={data}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    />
  );
};

export default ClickableBarChart;
