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
    image_src: [],
    contents: '콘텐츠입니다',
    user_storename: '싸게파는 판매자',
    category: '1',
};

export const EditorSlice = createSlice({
  name: 'Editor',
  initialState: initialState,
  reducers: {
    setEditorState(state, action: PayloadAction<EditorState>) {
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

export let { setEditorState, setStepOne, pushImage } = EditorSlice.actions;

export default EditorSlice.reducer;
