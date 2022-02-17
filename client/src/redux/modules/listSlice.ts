import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const getListAsync = createAsyncThunk('items/get', async (category?: number) => {
  const response = await axios({
    url: `${process.env.REACT_APP_URL}/items`,
    method: 'get',
    params: {
      category: category || null,
    },
    data: {},
  });

  console.log(response.data);
  return response.data;
});

export default listSlice.reducer;
