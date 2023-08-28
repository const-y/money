import api from './api';

export interface Period {
  from: string;
  to: string;
}

export interface IncomeExpensesReportData {
  income: number;
  expenses: number;
}

export const getIncomeExpensesReport = (params: Period) =>
  api
    .get<IncomeExpensesReportData>('/reports/income-expenses', { params })
    .then((result) => result.data);
