import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface List {
  data: [
    {
      contents: string;
      createdAt: string;
      id: number;
      image_src: string;
      item_has_categories: [];
      price: number;
      title: string;
      updatedAT: string;
      user: { storename: string };
      user_id: number;
    }?,
  ];
  keyword?: string;
}

const initialState: List = {
  data: [],
  keyword: '',
};

const navSearchSlice = createSlice({
  name: 'navSearch',
  initialState: initialState,
  reducers: {
    setReduxKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(navSearchAsync.fulfilled, (state, action) => {
      // let contents = action.payload;
      // return { ...state, data: contents };
      state.data = action.payload;
    });
  },
});

export let { setReduxKeyword } = navSearchSlice.actions;

export const navSearchAsync = createAsyncThunk(
  'search/post',
  async (keyword: string) => {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/items?keyword=${keyword}&number=205`,
    );
    console.log(response.data);
    return response.data;
  },
);

export default navSearchSlice.reducer;
