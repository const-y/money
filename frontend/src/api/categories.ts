import api from './api';

export interface Category {
  id: number;
  name: string;
  isExpense: boolean;
}

export type CreateCategoryData = Omit<Category, 'id'>;

export const getCategoryList = () =>
  api.get<Category[]>(`/categories/`).then((result) => result.data);

export const createCategory = (data: CreateCategoryData) =>
  api.post<Category>('/categories/', data).then((result) => result.data);

export const deleteCategory = (id: number) =>
  api.delete<Category>(`/categories/${id}/`).then((result) => result.data);

export const updateCategory = (data: Category) =>
  api
    .put<Category>(`/categories/${data.id}/`, data)
    .then((result) => result.data);
