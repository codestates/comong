import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';

const env = 'development';
const urlConfig = config[env];

export interface EditorState {
    title: string;
    price: string;
    image_src: Array<string>;
    contents: any;
    user_storename: string;
    category: string;
}

const initialState: EditorState = {
    title: '판매글의 제목',
    price: '0',
    image_src: ['http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904'],
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

    setStepOne(state, action: PayloadAction<any>) {
        console.log(action.payload)
        state.title = action.payload.title
        state.price = action.payload.price
        state.category = action.payload.category
    },

    pushImage(state, action: PayloadAction<any>) {
        console.log(action.payload)
        state.image_src.push(action.payload)
    },

  },
});

export let { resetContents, setContents, setStepOne, pushImage } = EditorSlice.actions;

export default EditorSlice.reducer;
