import { AxiosError } from 'axios';
import { apiClient } from '..';
import { IJoinForm } from '../../pages/join/GeneralJoin';

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
    const reqForm = { ...form, likes: JSON.stringify(form.likes) };
    const data = await apiClient.post('/users', reqForm);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
    //return Promise.reject(err);
  }
};

export const deleteUsers = async () => {
  try {
    const data = await apiClient.delete('/users');
    console.log(data);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export const deleteUserNotification = async (notiId: number) => {
  try {
    const reqForm = {
      data: {
        notification_id: notiId,
      },
    };
    const data = await apiClient.delete('/users/notification', reqForm);
    console.log(data);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};
