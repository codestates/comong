import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../apis';
import { ILoginForm } from '../../components/form/LoginForm';

// !TODO 타입 다시 확인하기
interface IUserInfo {
  birthday: string | null;
  createdAt: string;
  email: string;
  gender: string;
  id: number;
  mobile: string;
  nickname: string;
  role: string;
  updatedAt: string;
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
      return { isLogin: true, accessToken, role: user.role, user };
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
