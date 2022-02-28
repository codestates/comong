import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from '..';
import { IItem } from '../../pages/mypage/mypage_user/MypageBookmarks';

export const getItems = async () => {
  try {
    const data = await apiClient.get('/items');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export interface IAxiosBookmark {
  id: number;
  ismarked: number;
  item: IItem;
  item_id: number;
  user_id: number;
}

export const getBookmarks = async (userid: number) => {
  try {
    const response = await apiClient.get(`/items/bookmark?user_id=${userid}`);
    const data: IAxiosBookmark[] = response.data;
    const bookmarks = data.map((obj) => obj.item);
    console.log(data);
    return bookmarks;
  } catch (error) {
    console.log(error);
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
