import listSlice from './modules/listSlice';
import navSearchSlice from './modules/navSearchSlice';
import userSlice from './modules/userSlice';
import itemSlice from './modules/itemSlice';
import cartSlice from './modules/cartSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    listSlice,
    navSearchSlice,
    userSlice,
    itemSlice,
    cartSlice,
  },
});

//state 타입을 export 해두는건데 나중에 쓸 데가 있음
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
