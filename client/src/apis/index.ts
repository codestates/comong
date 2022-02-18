import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';

const env = 'development';
const { url, authURL } = config[env];

export const apiClient: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {},
});

// 임시 개발용
export const apiOauthClient: AxiosInstance = axios.create({
  baseURL: authURL,
  withCredentials: true,
  headers: {},
});

// export const apiAuthClient: AxiosInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_URL}`,
//   headers: { Authorization: 'Bearer' + `` },
// });
