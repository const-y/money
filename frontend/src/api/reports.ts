import api from './api';

export interface Period {
  from: string;
  to: string;
}

export interface IncomeExpensesReportData {
  income: number;
  expenses: number;
}

export interface ExpensesByCurrenciesReportDataItem {
  currency: string;
  month: number;
  totalAmount: number;
}

export const getIncomeExpensesReport = (params: Period) =>
  api
    .get<IncomeExpensesReportData>('/reports/income-expenses', { params })
    .then((result) => result.data);

export const getExpensesBuCurrenciesReport = (year: number) =>
  api
    .get<ExpensesByCurrenciesReportDataItem[]>(
      '/reports/expenses-by-currencies',
      {
        params: { year },
      }
    )
    .then((result) => result.data);
