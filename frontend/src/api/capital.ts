import api from './api';

export interface Capital {
  capital: number;
}

export const getCapital = () =>
  api.get<Capital>('/capital/').then((result) => result.data);
