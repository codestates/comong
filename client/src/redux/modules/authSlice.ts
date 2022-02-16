import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../apis';
import { ILoginForm } from '../../components/form/LoginForm';

export interface IAuth {
  isLogin: boolean;
  accessToken?: string;
  role?: number;
}

const initialState: IAuth = {
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      delete state.accessToken;
      delete state.role;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSigninAsync.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      return { isLogin: true, accessToken, role: user.role };
    });
  },
});

export const postSigninAsync = createAsyncThunk(
  'LOGIN_USER',
  async (form: ILoginForm) => {
    const response = await apiClient.post(`/users/signin`, form);
    return response.data;
  },
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
