import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';

const env = 'development';
const { url, authURL } = config[env];

export const apiClient: AxiosInstance = axios.create({
  baseURL: url,
});

export const setClientHeadersToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `bearer ${token}`;
};

export const deleteClientHeadersToken = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

// 임시 개발용
export const apiOauthClient: AxiosInstance = axios.create({
  baseURL: authURL,
  withCredentials: true,
  headers: {},
});
