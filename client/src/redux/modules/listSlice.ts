import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    console.log('리스트어싱크 실행');
    const response = await apiClient.get('items', {
      params: {
        category: category || null,
      },
    });
    return response.data;
  },
);

export default listSlice.reducer;
