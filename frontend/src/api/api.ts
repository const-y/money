import axios, { AxiosInstance } from 'axios';

export interface Entity {
  id: number;
}

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export default api;
