import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { idText } from 'typescript';
import {
  apiClient,
  deleteClientHeadersToken,
  setClientHeadersToken,
} from '../../apis';
import { ILoginForm } from '../../components/form/LoginForm';
import {
  IItem,
  IItemPartial,
} from '../../pages/mypage/mypage_user/MypageBookmarks';

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

export interface INotification {
  id: number;
  updatedAt: string;
  read: boolean;
  data: {
    order_id: string;
    shipping_status: string;
    status: string;
    updatedAt: string;
  };
  itemInfo: IItemPartial[];
}

export interface IUser {
  isLogin: boolean;
  accessToken?: string;
  role?: number;
  userinfo?: IUserInfo;
  notification?: INotification[];
  isLoading?: boolean;
}

const initialState: IUser = {
  isLogin: false,
  isLoading: false,
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
    addNotification: (state, action) => {
      console.log(action.payload);
      const prevNotification = state.notification;
      state.notification = prevNotification && [
        ...prevNotification,
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSigninAsync.fulfilled, (state, action) => {
      console.log(
        '1에서 수행한게 승인되면 여기로 옴, 1에서 리턴받은 데이터가 action.payload로 들어옴',
      );
      console.log(action.payload);
      const { accessToken, user, notification } = action.payload;
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

      return {
        isLogin: true,
        accessToken,
        role: user.role,
        userinfo,
        notification,
      };
    });

    builder.addCase(postSigninAsync.pending, (state, action) => {
      state.isLoading = true;
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

    builder.addCase(patchUserNotificationAsync.fulfilled, (state, action) => {
      console.log(state.notification);
      console.log('notiId', action.payload);
      if (!!state.notification) {
        console.log('hi');
        const notis = state.notification;
        const notiIdx = notis.findIndex((noti) => noti.id === action.payload);
        state.notification = [
          ...notis.slice(0, notiIdx),
          { ...notis[notiIdx], read: true },
          ...notis.slice(notiIdx + 1),
        ];
      }
    });
  },
});

export const postSigninAsync = createAsyncThunk(
  'post/login',
  async (form?: ILoginForm) => {
    console.log('1번, 여기서 비동기 작업하고 data 리턴');
    let response;
    if (form) {
      response = await apiClient.post(`/users/signin`, form);
    } else {
      response = await apiClient.get(`/users`);
    }
    //const response = await apiClient.post(`/users/signin`, form);
    const notification = (
      await apiClient.get(
        `/users/notification?user_id=${response.data.user.id}`,
      )
    ).data;
    console.log('noti', notification);
    console.log(response.data);
    const newNotification = notification.data.map(
      (obj: {
        id: number;
        updatedAt: string;
        read: number;
        contents: string;
      }) => {
        const newContents = {
          id: obj.id,
          updatedAt: obj.updatedAt,
          read: obj.read === 0 ? false : true,
          ...JSON.parse(obj.contents),
        };
        return newContents;
      },
    );
    const data = { ...response.data, notification: newNotification.reverse() };
    return data;
  },
);

// export const getOauthUserAsync = createAsyncThunk('post/login', async () => {
//   const response = await apiClient.get(`/users`);
//   const notification = (
//     await apiClient.get(`/users/notification?user_id=${response.data.user.id}`)
//   ).data;
//   const newNotification = notification.data.map(
//     (obj: {
//       id: number;
//       updatedAt: string;
//       read: number;
//       contents: string;
//     }) => {
//       const newContents = {
//         id: obj.id,
//         updatedAt: obj.updatedAt,
//         read: obj.read === 0 ? false : true,
//         ...JSON.parse(obj.contents),
//       };
//       return newContents;
//     },
//   );
//   const data = { ...response.data, notification: newNotification.reverse() };
//   return data;
// });

export const postBookmarkAsync = createAsyncThunk(
  'post/bookmark',
  async (body: { user_id: number; item_id: number; ismarked: boolean }) => {
    const response = await apiClient.post('/items/bookmark', body);
    console.log(response);
    return body.item_id;
  },
);

export const patchUserNotificationAsync = createAsyncThunk(
  'patch/notification',
  async ({ userId, notiId }: { userId: number; notiId: number }) => {
    const response = await apiClient.patch(
      `/users/notification?user_id=${userId}`,
      { notification_id: notiId, read: 1 },
    );
    console.log(response.data);
    return notiId;
  },
);

export const { logout, addNotification } = userSlice.actions;
export default userSlice.reducer;
