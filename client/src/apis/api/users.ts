import { AxiosError } from 'axios';
import { apiClient } from '..';
import { IJoinForm, IJoinPartial } from '../../pages/join/GeneralJoin';

export const getIsDuplicate = async (email: string) => {
  try {
    await apiClient.get(`/users/isduplicate/${email}`);
    return true;
  } catch (error) {
    const err = error as AxiosError;
    const status = err.response?.status;
    if (status === 403) {
      return false;
    }
  }
};

export const postUsers = async (form: IJoinForm) => {
  try {
    const data = await apiClient.post('/users', form);
    console.log(data);
    return data;
  } catch (err) {
    console.log('에러@', err);
  }
};

export const patchUsers = async (form: IJoinPartial) => {
  try {
    const data = await apiClient.patch('/users', form);
    console.log(data);
    return data;
  } catch (err) {
    console.log('에러@', err);
  }
};
