import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';
import { apiClient } from '../../apis';

const env = 'development';
const urlConfig = config[env];

export interface List {
  data: [];
}

const initialState: List = {
  data: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      return { ...state, data: contents };
    });
  },
});

export let {} = listSlice.actions;

export const getListAsync = createAsyncThunk(
  'items/get',
  async (category?: number) => {
    const response = await apiClient.get('items', {
      params: {
        category: category || null,
      },
    });

    // const response = await axios({
    //   url: `${urlConfig.url}/items`,
    //   method: 'get',
    //   params: {
    //     category: category || null,
    //   },
    //   data: {},
    // });
    return response.data;
  },
);

export default listSlice.reducer;
