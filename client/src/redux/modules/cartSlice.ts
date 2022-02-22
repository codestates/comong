import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from '../../config/config';
import { apiClient } from '../../apis';
import { useNavigate } from 'react-router-dom';

const env = 'development';
const urlConfig = config[env];

export interface Cart {
  data: {
    [index: string]: {
      order_details: [
        {
          id: string;
          item: {};
          item_id: number;
          order_amount: number;
          peritem_price: number;
          status: string;
          createdAt: string;
          updatedAt: string;
          user_id: number;
        },
      ];
    };
  }[];
  totalPrice: number;
  totalDelivery: number;
  totalSeller: number;
  subTotalPrice: { [index: string]: number };
  remainItem: [];
}

const initialState: Cart = {
  data: [],
  totalPrice: 0,
  totalDelivery: 0,
  totalSeller: 0,
  subTotalPrice: {},
  remainItem: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    increment(state: any, action: PayloadAction<any>) {
      let id = action.payload[0];
      let storeName = action.payload[1];
      let groupName = action.payload[2];

      if (
        state.data[0][groupName].order_details.filter(
          (el: any) => el.id === id,
        )[0].order_amount <= 98
      ) {
        state.data[0][groupName].order_details.filter(
          (el: any) => el.id === id,
        )[0].order_amount += 1;
      }
    },
    decrement(state: any, action: PayloadAction<any>) {
      let id = action.payload[0];
      let storeName = action.payload[1];
      let groupName = action.payload[2];

      if (
        state.data[0][groupName].order_details.filter(
          (el: any) => el.id === id,
        )[0].order_amount >= 2
      ) {
        state.data[0][groupName].order_details.filter(
          (el: any) => el.id === id,
        )[0].order_amount -= 1;
      }
    },
    deleteItem(state: any, action: PayloadAction<any>) {
      let id = action.payload[0];
      let groupName = action.payload[1];
      let arr = [...state.data[0][groupName].order_details];
      arr = arr.filter((el) => el.id !== id);
      state.data[0][groupName].order_details = arr;
    },
    setTotalPrice(state: any, action: PayloadAction<any>) {
      let sum = 0;
      for (let x in action.payload) {
        sum += action.payload[x];
      }

      state.totalPrice = sum;
    },
    setSubTotalPrice(state: any, action: PayloadAction<any>) {
      let keyName = action.payload[0];
      let value = action.payload[1];

      state.subTotalPrice[keyName] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.pending, (state, action) => {});
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      return { ...state, data: contents };
    });
    builder.addCase(getCartAsync.rejected, (state, action) => {});

    builder.addCase(getCartPatchAsync.fulfilled, (state, action) => {});
  },
});

export let {
  increment,
  decrement,
  setTotalPrice,
  setSubTotalPrice,
  deleteItem,
} = cartSlice.actions;

export const getCartAsync = createAsyncThunk(
  'orders/get',
  async (id?: number) => {
    id = 2;
    const response: AxiosResponse = await axios({
      url: `${urlConfig.url}/orders/cart?user_id=${id}`,
      method: 'get',
    });
    return response.data;
  },
);
export const getCartPatchAsync = createAsyncThunk(
  'orders/patch',
  async (data: [{ user_id: number }]) => {
    const id: number = data[0].user_id;
    const response = await axios({
      url: `${urlConfig.url}/orders/orderdetail`,
      method: 'patch',
      data: { data },
    });
    console.log('response', response);
    return response.data;
  },
);
export const deleteCartAsync = createAsyncThunk(
  'orders/delete',
  async (id: number) => {
    const response = await axios({
      url: `${urlConfig.url}/orders/cart`,
      method: 'delete',
      data: { order_detail_id: id },
    });
    console.log('response', response);
    return response.data;
  },
);

export default cartSlice.reducer;
