import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { config } from '../../config/config';
import { apiClient } from '../../apis';

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
  orderInfo: {
    createdAt: string;
    id: number;
    shipping_code: string;
    shipping_company: string;
    shipping_status: string;
    status: string;
    total_amount: number;
    updatedAt: string;
    user_id: number;
  };
}

const initialState: Cart = {
  data: [],
  totalPrice: 0,
  totalDelivery: 0,
  totalSeller: 0,
  subTotalPrice: {},
  remainItem: [],
  orderInfo: {
    createdAt: '2022-02-22T08:25:19.968Z',
    id: 41,
    shipping_code: '01234567890',
    shipping_company: 'cj대한통운',
    shipping_status: 'delivered',
    status: 'paid',
    total_amount: 150000,
    updatedAt: '2022-02-22T08:25:19.968Z',
    user_id: 2,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    increment(state, action) {
      let id = action.payload[0];
      let storeName = action.payload[1];
      let groupName = action.payload[2];

      if (
        state.data[0][groupName].order_details.filter((el) => el.id === id)[0]
          .order_amount <= 98
      ) {
        state.data[0][groupName].order_details.filter(
          (el) => el.id === id,
        )[0].order_amount += 1;
      }
    },
    decrement(state, action) {
      let id = action.payload[0];
      let storeName = action.payload[1];
      let groupName = action.payload[2];

      if (
        state.data[0][groupName].order_details.filter((el) => el.id === id)[0]
          .order_amount >= 2
      ) {
        state.data[0][groupName].order_details.filter(
          (el) => el.id === id,
        )[0].order_amount -= 1;
      }
    },
    deleteItem(state: any, action) {
      let id = action.payload[0];
      let groupName = action.payload[1];
      let arr = [...state.data[0][groupName].order_details];
      arr = arr.filter((el) => el.id !== id);
      state.data[0][groupName].order_details = arr;
    },
    setTotalPrice(state, action) {
      let sum = 0;
      for (let x in action.payload) {
        sum += action.payload[x];
      }

      state.totalPrice = sum;
    },
    setSubTotalPrice(state, action) {
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
    builder.addCase(getCartPatchAsync.pending, (state, action) => {});
    builder.addCase(getCartPatchAsync.fulfilled, (state, action) => {});
    builder.addCase(getCartPatchAsync.rejected, (state, action) => {});
    builder.addCase(postOrderAsync.pending, (state, action) => {});
    builder.addCase(postOrderAsync.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.orderInfo = action.payload.data;
    });
    builder.addCase(postOrderAsync.rejected, (state, action) => {});
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
    console.log(id);

    const response = await apiClient.get(
      `${urlConfig.url}/orders/cart?user_id=${id}`,
      {},
    );

    return response.data;
  },
);
export const getCartPatchAsync = createAsyncThunk(
  'orders/patch',
  async (data: [{ user_id: number | undefined }]) => {
    console.log('orders-patch', data);
    const response = await apiClient.patch(
      `${urlConfig.url}/orders/orderdetail`,
      {
        data: data,
      },
    );
    console.log('response', response);
    return response.data;
  },
);
export const deleteCartAsync = createAsyncThunk(
  'orders/delete',
  async (id: number) => {
    const response = await apiClient.delete(`${urlConfig.url}/orders/cart`, {
      data: { order_detail_id: id },
    });

    console.log('response', response);
    return response.data;
  },
);

export const postOrderAsync = createAsyncThunk('orders/post', async () => {
  let data = {
    total_amount: 150000,
    status: 'paid',
    user_id: 2,
    order_detail_id: [16, 14],
    shipping_status: 'delivered',
    shipping_company: 'cj대한통운',
    shipping_code: '01234567890',
  };
  const response = await apiClient.post(`${urlConfig.url}/orders`, {
    total_amount: 150000,
    status: 'pending',
    user_id: 213,
    order_detail_id: [14, 16],
    shipping_status: 'delivered',
    shipping_company: 'cj대한통운',
    shipping_code: '01234567890',
  });
  // const response = await apiClient.post(`${urlConfig.url}/orders`, {
  //   data: data,
  // });
  // const response = await apiClient.post(`${urlConfig.url}/orders`, {
  //   data: { data },
  // });
  // const response = await apiClient.post(`${urlConfig.url}/orders`, {
  //   { data:data },
  // });

  console.log('response-order_post_data', response.data);
  return response.data;
});

export default cartSlice.reducer;
