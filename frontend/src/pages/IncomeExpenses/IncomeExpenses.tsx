import { FC, SyntheticEvent, useState } from 'react';
import { Header } from 'semantic-ui-react';

import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { SemanticDatepickerProps } from 'react-semantic-ui-datepickers/dist/types';
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

const initialDateRange = [startOfMonth, endOfMonth];

const IncomeExpenses: FC = () => {
  const [dateRange, setDateRange] = useState(initialDateRange);

  const handleDateRangeChange = (
    _event: SyntheticEvent<Element, Event> | undefined,
    data: SemanticDatepickerProps
  ) => {
    const { value } = data;

    if (Array.isArray(value)) setDateRange(value);
  };

  const [from, to] = dateRange;

  return (
    <>
      <Header as="h1">Доходы и расходы</Header>
      <SemanticDatepicker
        name="date"
        value={dateRange}
        onChange={handleDateRangeChange}
        format="YYYY-MM-DD"
        required
        type="range"
      />
      {from && to && <IncomeExpensesReportView from={from} to={to} />}
    </>
  );
};

export default IncomeExpenses;
