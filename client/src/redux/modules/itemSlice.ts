import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';
import { apiClient } from '../../apis';

const env = 'development';
const urlConfig = config[env];

export interface Item {
  data: {
    id: number;
    title: string;
    price: number;
    image_src: string;
    contents: string;
    user_storename: string;
    category: string;
  };
}

const initialState: Item = {
  data: {
    id: 3167,
    title: '판매글의 제목',
    price: 99999,
    image_src: 'http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904',
    contents: '콘텐츠입니다',
    user_storename: '싸게파는 판매자',
    category: '기타 카테고리',
  },
};

const itemSlice = createSlice({
  name: 'item',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      // console.log('contents', contents);
      // return { ...state, data: contents };
      return { ...state, data: contents };
    });
  },
});

export let {} = itemSlice.actions;

export const getItemAsync = createAsyncThunk(
  'items/details',
  async (id?: number) => {
    const response = await apiClient.get(
      `${urlConfig.url}/items/details/${id}`,
      {
        data: {},
      },
    );

    // console.log(response.data);
    return response.data;
  },
);

export default itemSlice.reducer;
