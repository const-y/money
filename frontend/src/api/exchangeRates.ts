import api, { Entity } from './api';

export type Currency = 'RUB' | 'USD' | 'GEL';

export interface ExchangeRate extends Entity {
  currency: Currency;
  baseCurrency: Currency;
  date: string;
  rate: number;
}

export type CreateExchangeRateData = Omit<ExchangeRate, 'id'>;

export const getExchangeRateList = () =>
  api.get<ExchangeRate[]>('/exchange-rates/').then((result) => result.data);

export const createExchangeRate = (data: CreateExchangeRateData) =>
  api
    .post<ExchangeRate>('/exchange-rates/', data)
    .then((result) => result.data);

export const deleteExchangeRate = (id: number) =>
  api
    .delete<ExchangeRate>(`/exchange-rates/${id}/`)
    .then((result) => result.data);

export const updateExchangeRate = (data: ExchangeRate) =>
  api
    .put<ExchangeRate>(`/exchange-rates/${data.id}/`, data)
    .then((result) => result.data);
