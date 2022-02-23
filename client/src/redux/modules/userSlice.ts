import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
      delete user.category_has_users;
      const userinfo = { ...user, likes };
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
  async (itemid: number) => {
    const { userinfo } = useAppSelector((state) => state.userSlice);
    let ismarked = userinfo?.bookmarks.includes(itemid);
    const body = {
      user_id: userinfo?.id,
      item_id: itemid,
      ismarked: !ismarked,
    };
    const response = await apiClient.post('/items/bookmark', body);
    return response.data;
  },
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
