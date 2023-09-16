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

  const updateCursor = (
    chart: Chart<'bar'>,
    event: MouseEvent<HTMLCanvasElement>
  ) => {
    chart.canvas.style.cursor = getElementAtEvent(chart, event).length
      ? 'pointer'
      : 'auto';
  };

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;
    const index = getClickedElementIndex(event, chart);

    if (index !== null) {
      onClick(index);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;

    if (chart) {
      updateCursor(chart, event);
    }
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

function getClickedElementIndex(
  event: MouseEvent<HTMLCanvasElement>,
  chart: Chart<'bar'> | null
): number | null {
  if (!chart) return null;

  const element = getElementAtEvent(chart, event);

  if (!element.length) return null;

  return element[0].index;
}

export default ClickableBarChart;
