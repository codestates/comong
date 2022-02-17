import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    url: `${process.env.REACT_APP_URL}/items/${id}`,
    method: 'get',
    data: {},
  });

  console.log(response.data);
  return response.data;
});

export default itemSlice.reducer;
