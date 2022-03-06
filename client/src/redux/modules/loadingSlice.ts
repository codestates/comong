import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../config/config';
import { apiClient } from '../../apis';

const env = 'development';
const urlConfig = config[env];

export interface List {
  isLoading: boolean;
}

const initialState: List = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      console.log('setLoading 들어옴');
      console.log('action.payload', action.payload);
      state.isLoading = action.payload;
    },
  },
});

export let { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
