import { getAccessToken, setAccessToken } from '@/services/tokenService';
import axios, { AxiosInstance } from 'axios';
import { refreshToken } from './auth';
import routes from '@/constants/routes';

export interface Entity {
  id: number;
}

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      window.location.pathname !== routes.LOGIN
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { accessToken } = await refreshToken();
        setAccessToken(accessToken);

        refreshSubscribers.forEach((callback) => callback(accessToken));

        refreshSubscribers = [];

        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = routes.LOGIN;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
