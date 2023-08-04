import api from './api';

export interface Category {
  id: number;
  name: string;
}

export const getCategoryList = () =>
  api.get<Category[]>(`/categories/`).then((result) => result.data);
