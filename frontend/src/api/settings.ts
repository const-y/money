import api from './api';

export interface Setting {
  key: string;
  value: string;
}

export const getSettings = () =>
  api.get<Setting[]>('/settings/').then((result) => result.data);
