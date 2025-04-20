import api from './api';

export const login = (username: string, password: string) =>
  api
    .post<{ accessToken: string }>(
      '/auth/login/',
      { username, password },
      {
        withCredentials: true,
      }
    )
    .then((result) => result.data);

export const getToken = () =>
  api
    .get<{ accessToken: string }>('/auth/token/', { withCredentials: true })
    .then((result) => result.data);

export const getMe = () => api.get('/auth/me/').then((result) => result.data);

export const refreshToken = () =>
  api
    .post<{ accessToken: string }>('/auth/refresh/')
    .then((result) => result.data);

export const logout = () =>
  api.post('/auth/logout/').then((result) => result.data);
