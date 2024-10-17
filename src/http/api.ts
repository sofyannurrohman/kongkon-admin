import axios, { type AxiosInstance } from 'axios';

// Create an Axios instance with type support
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
});

export default api;
