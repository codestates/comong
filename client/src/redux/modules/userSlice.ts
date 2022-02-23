import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { apiClient } from '../../apis';
import { ILoginForm } from '../../components/form/LoginForm';
import { useAppSelector } from '../configStore.hooks';

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
  likes: number[];
  bookmarks: number[];
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
      console.log(
        '1에서 수행한게 승인되면 여기로 옴, 1에서 리턴받은 데이터가 action.payload로 들어옴',
      );
      const { accessToken, user } = action.payload;
      const likes = Array.isArray(user.category_has_users)
        ? user.category_has_users.map(
            (el: { category_id: number }) => el.category_id,
          )
        : [];
      const bookmarks = user.bookmarks.map(
        (obj: { item_id: number }) => obj.item_id,
      );
      delete user.category_has_users;
      const userinfo = { ...user, likes, bookmarks };
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `bearer ${accessToken}`;
      return { isLogin: true, accessToken, role: user.role, userinfo };
    });

    builder.addCase(postSigninAsync.rejected, (state, action) => {
      // rejected 된 경우 userSlice state를 바꾸고 싶다면 여기서 처리
      return;
    });

    builder.addCase(postBookmarkAsync.fulfilled, (state, action) => {
      // 북마크 state 업데이트
      if (!!state.userinfo) {
        const bookmarks = state.userinfo.bookmarks;
        const marked = bookmarks.findIndex((el) => el === action.payload);
        state.userinfo.bookmarks =
          marked === -1
            ? [...bookmarks, action.payload]
            : [...bookmarks.slice(0, marked), ...bookmarks.slice(marked + 1)];
      }
    });
  },
});

export const postSigninAsync = createAsyncThunk(
  'LOGIN_USER',
  async (form: ILoginForm) => {
    console.log('1번, 여기서 비동기 작업하고 data 리턴');
    const response = await apiClient.post(`/users/signin`, form);
    return response.data;
  },
);

export const postBookmarkAsync = createAsyncThunk(
  'bookmark/post',
  async (body: { user_id: number; item_id: number; ismarked: boolean }) => {
    const response = await apiClient.post('/items/bookmark', body);
    console.log(response);
    return body.item_id;
  },
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
