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
  paymentInfo: {
    user_id?: number;
    order_id?: number;
    total_amount?: number;
    imp_uid?: string;
    merchant_uid?: string;
    buyer_name?: string;
    success?: boolean;
    status?: string;
    error_msg?: string;
  };
  shipInfo: {
    name?: string;
    buyer_name?: string;
    buyer_tel?: string;
    buyer_email?: string;
    buyer_address?: string;
    ship_name?: string;
    ship_tel?: string;
    ship_address?: string;
  };
  addressInfo: {
    user_id?: number;
    email?: string;
    address_line1?: string;
    address_line2?: string;
    postal_code?: number;
    city?: string;
    country?: string;
    telephone?: string;
    mobile?: string;
  };
  destinationInfo: {
    name?: string;
    tel?: string;
    email?: string;
    postCode?: string;
    address1?: string;
    address2?: string;
  };
  testInfo: {};
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
  paymentInfo: {},
  shipInfo: {},
  addressInfo: {},
  destinationInfo: {},
  testInfo: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },

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
      // console.log('토탈프라이스 작동');
      let sum = 0;
      for (let x in action.payload) {
        sum += action.payload[x];
      }
      console.log('sum in setTotalPrice', sum);

      state.totalPrice = sum;
    },
    setTotalPriceForOne(state, action) {
      state.totalPrice = action.payload;
    },
    setDelivery(state, action) {
      state.totalDelivery = action.payload;
    },
    setSubTotalPrice(state, action) {
      let keyName = action.payload[0];
      let value = action.payload[1];
      console.log('keyName', keyName);
      if (keyName === 'deleteAll') {
        state.subTotalPrice = {};
      } else {
        state.subTotalPrice[keyName] = value;
      }
    },
    setSubTotalPriceForOne(state, action) {
      let keyName = action.payload[0];
      let value = action.payload[1];

      state.subTotalPrice = { keyName: value };
    },
    setPaymentInfo(state, action) {
      state.paymentInfo = action.payload;
    },
    setShipInfo(state, action) {
      state.shipInfo = action.payload;
    },
    setDestinationInfo(state: any, action: any) {
      console.log(action.payload);
      state.destinationInfo = action.payload;
    },
    setTestInfo(state, action) {
      state.testInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.pending, (state, action) => {});
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      let contents = action.payload;
      console.log('getCartAsync-action.payload', contents);
      return { ...state, data: contents };
    });
    builder.addCase(getCartAsync.rejected, (state, action) => {});
    builder.addCase(getCartPatchAsync.pending, (state, action) => {});
    builder.addCase(getCartPatchAsync.fulfilled, (state, action) => {});
    builder.addCase(getCartPatchAsync.rejected, (state, action) => {});
    builder.addCase(postOrderAsync.pending, (state, action) => {});
    builder.addCase(postOrderAsync.fulfilled, (state, action) => {
      console.log('action.payload-orderInfo', action.payload);
      state.orderInfo = action.payload.data;
    });
    builder.addCase(postOrderAsync.rejected, (state, action) => {});
    builder.addCase(getUsersAsync.pending, (state, action) => {});
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      console.log('action.payload.address', action.payload.address);
      state.addressInfo = action.payload.address;
    });
    builder.addCase(getUsersAsync.rejected, (state, action) => {});
    builder.addCase(postOrderDetailAsync.pending, (state, action) => {});
    builder.addCase(postOrderDetailAsync.fulfilled, (state, action) => {});
    builder.addCase(postOrderDetailAsync.rejected, (state, action) => {});
  },
});

export let {
  setData,
  increment,
  decrement,
  setTotalPrice,
  setTotalPriceForOne,
  setDelivery,
  setSubTotalPrice,
  setSubTotalPriceForOne,
  deleteItem,
  setPaymentInfo,
  setDestinationInfo,
  setTestInfo,
} = cartSlice.actions;

export const getCartAsync = createAsyncThunk(
  'orders/get',
  async (id?: number) => {
    console.log('cartAsync 실행');
    console.log('id', id);
    console.log('type of', typeof id);
    if (typeof id === 'number') {
      const response = await apiClient.get(
        `${urlConfig.url}/orders/cart?user_id=${id}`,
        {},
      );

      console.log('cartslice', response.data);

      return response.data;
    }
  },
);
export const postOrderDetailAsync = createAsyncThunk(
  'orderdetail/post',
  async (data: {}) => {
    const response = await apiClient.post(
      `${urlConfig.url}/orders/orderdetail`,
      data,
    );
    console.log('post-orderDetail', response.data);
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

export const postOrderAsync = createAsyncThunk(
  'orders/post',
  async (data?: {}) => {
    const response = await apiClient.post(`${urlConfig.url}/orders`, data);
    console.log('postOrderAsync-response', response);
    return response.data;
  },
);

export const getUsersAsync = createAsyncThunk(
  'users/address/get',
  async (id?: number) => {
    const response = await apiClient.get(`${urlConfig.url}/users/address`);
    console.log(response);
    return response.data;
  },
);

export default cartSlice.reducer;
