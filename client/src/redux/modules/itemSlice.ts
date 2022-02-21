import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';

const env = 'development';
const urlConfig = config[env];

export interface Item {
  data: [];
}

const initialState: Item = {
  data: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      return { ...state, data: contents };
    });
  },
});

export let {} = itemSlice.actions;

export const getItemAsync = createAsyncThunk('items/get', async (id) => {
  const response = await axios({
    url: `${urlConfig.url}/items/datails{id}?id=${id}`,
    method: 'get',
    data: {},
  });

  console.log(response.data);
  return response.data;
});

export default itemSlice.reducer;
