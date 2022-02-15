import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface List {
  data: string;
}

const initialState: List = {
  data: '',
};

const navSearchSlice = createSlice({
  name: 'navSearch',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(navSearchAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      return { ...state, data: contents };
    });
  },
});

export let {} = navSearchSlice.actions;

export const navSearchAsync = createAsyncThunk(
  'search/post',
  async (keyword) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/search`);
    return response.data;
  },
);

export default navSearchSlice.reducer;
