import { PageTitle } from '@/components/ui';
import DateRangePicker from '@/components/ui/DateRangePicker';
import { FC, useState } from 'react';
import IncomeExpensesReportView from './IncomeExpensesReportView';

const currentDate = new Date();

// Получение начала месяца
const startOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

// Получение конца месяца
const endOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
);

const initialDateRange: [Date, Date] = [startOfMonth, endOfMonth];

const IncomeExpenses: FC = () => {
  const [dateRange, setDateRange] = useState(initialDateRange);

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  const [from, to] = dateRange;

  return (
    <>
      <PageTitle>Доходы и расходы</PageTitle>
      <DateRangePicker
        value={dateRange}
        onChange={handleDateRangeChange}
        required
      />
      {from && to && <IncomeExpensesReportView from={from} to={to} />}
    </>
  );
};

export default IncomeExpenses;
