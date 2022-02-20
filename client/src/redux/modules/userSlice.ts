import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { Axios, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../apis';
import { ILoginForm } from '../../components/form/LoginForm';

// !TODO 타입 다시 확인하기
interface IUserInfo {
  birthday: string;
  createdAt: string;
  email: string;
  gender: number;
  id: number;
  mobile: string;
  name: string;
  role: number;
  updatedAt: string;
  likes: number[] | [];
}

export interface IUser {
  isLogin: boolean;
  accessToken?: string;
  role?: number;
  userinfo?: IUserInfo;
}

const initialState: IUser = {
  isLogin: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      delete state.accessToken;
      delete state.role;
      delete state.userinfo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSigninAsync.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      console.log(user);
      const likes = user.category_has_users.map(
        (el: { category_id: number }) => el.category_id,
      );
      delete user.category_has_users;
      const userinfo = { ...user, likes };
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `bearer ${accessToken}`;
      return { isLogin: true, accessToken, role: user.role, userinfo };
    });
  },
});

export const postSigninAsync = createAsyncThunk(
  'LOGIN_USER',
  async (form: ILoginForm) => {
    try {
      const response = await apiClient.post(`/users/signin`, form);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err.response?.data;
    }
  },
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
