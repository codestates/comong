import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';
import { apiClient } from '../../apis';

const env = 'development';
const urlConfig = config[env];

export interface Cart {
  data: { [index: string]: { order_details: [] } }[];
  totalPrice: number;
  totalDelivery: number;
  totalSeller: number;
  subTotalPrice: { [index: string]: number };
}

const initialState: Cart = {
  data: [],
  totalPrice: 0,
  totalDelivery: 0,
  totalSeller: 0,
  subTotalPrice: {},
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
    setTotalPrice(state: any, action: PayloadAction<any>) {
      console.log(action.payload);
      let sum = 0;
      for (let x in action.payload) {
        console.log(action.payload);
        sum += action.payload[x];
      }
      console.log('sum', sum);
      state.totalPrice = sum;
    },
    setSubTotalPrice(state: any, action: PayloadAction<any>) {
      let keyName = action.payload[0];
      let value = action.payload[1];

      state.subTotalPrice[keyName] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      return { ...state, data: contents };
    });
  },
});

export let { increment, decrement, setTotalPrice, setSubTotalPrice } =
  cartSlice.actions;

export const getCartAsync = createAsyncThunk(
  'orders/get',
  async (id?: number) => {
    id = 2;
    const response = await axios({
      url: `${urlConfig.url}/orders/cart?user_id=${id}`,
      method: 'get',
    });
    return response.data;
  },
);
export const getCartPatchAsync = createAsyncThunk(
  'orders/patch',
  async (id?: number) => {
    const response = await axios({
      url: `${urlConfig.url}/orders/user_id=${id}`,
      method: 'patch',
      data: {},
    });
    return response.data;
  },
);

export default cartSlice.reducer;
