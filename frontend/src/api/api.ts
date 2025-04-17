import routes from '@/constants/routes';
import { getAccessToken } from '@/services/tokenService';
import axios, { Axios, AxiosError, AxiosInstance } from 'axios';

export interface Entity {
  id: number;
}

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const AxiosError = error as AxiosError;

    if (AxiosError.response?.status === 401) {
      window.location.href = routes.LOGIN;
    }

    return Promise.reject(AxiosError);
  }
);

export default api;
