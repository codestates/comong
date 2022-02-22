import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { apiClient } from '..';

export const getItems = async () => {
  try {
    const data = await apiClient.get('/items');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCloudUrl = async (file: File) => {
  try {
    const response = await apiClient.post('/items/imageuploadurl', {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    const { uploadURL } = response.data;
    return await uploadCloudImg(file, uploadURL);
  } catch (err) {
    console.log(err);
  }
};

const uploadCloudImg = async (file: File, url: string) => {
  let bodyFormData = new FormData();
  bodyFormData.append('file', file);
  try {
    const response = await axios.post(url, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.result.variants;
  } catch (error) {
    console.log(error);
  }
};
