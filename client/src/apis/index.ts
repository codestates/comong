import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  withCredentials: true,
  headers: {},
});

// 임시 개발용
export const apiOauthClient: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_OAUTH_URL}`,
  withCredentials: true,
  headers: {},
});

// export const apiAuthClient: AxiosInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_URL}`,
//   headers: { Authorization: 'Bearer' + `` },
// });
