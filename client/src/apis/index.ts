import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  headers: {},
});

export const apiAuthClient: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  headers: { Authorization: 'Bearer' + '토큰' },
});
