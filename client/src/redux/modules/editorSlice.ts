import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';

const env = 'development';
const urlConfig = config[env];

export interface EditorState {
    title: string;
    price: number;
    image_src: string;
    contents: any;
    user_storename: string;
    category: string;
}

const initialState: EditorState = {
    title: '판매글의 제목',
    price: 0,
    image_src: 'http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904',
    contents: '콘텐츠입니다',
    user_storename: '싸게파는 판매자',
    category: '기타 카테고리',
};

export const EditorSlice = createSlice({
  name: 'Editor',
  initialState: initialState,
  reducers: {
    resetContents: (state, { payload }: PayloadAction<any>) => {
        // ...
        state.contents = [payload]
    },
    setContents(state, action: PayloadAction<EditorState>) {
        state.contents = action.payload
    },

  },
});

export let { resetContents, setContents } = EditorSlice.actions;

export default EditorSlice.reducer;
