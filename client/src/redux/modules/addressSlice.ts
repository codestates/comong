import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../apis';
import { patchUsersAsync } from './userSlice';

export interface IAddress {
  postal_code: string;
  address1: string;
  address2: string;
}

const initialState: IAddress = {
  postal_code: '',
  address1: '',
  address2: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddressAsync.fulfilled, (state, action) => {
      const { postal_code, address1, address2 } = action.payload;
      state.postal_code = postal_code;
      state.address1 = address1;
      state.address2 = address2;
    });

    builder.addCase(getAddressAsync.pending, (state, action) => {});

    builder.addCase(getAddressAsync.rejected, (state, action) => {
      console.log('안돼');
    });

    builder.addCase(patchUsersAsync.fulfilled, (state, action) => {
      const { postal_code, address1, address2 } = action.payload;
      state.postal_code = postal_code!;
      state.address1 = address1!;
      state.address2 = address2!;
    });
  },
});

export const getAddressAsync = createAsyncThunk('get/address', async () => {
  const address = (await apiClient.get('/users/address')).data.address;
  const {
    postal_code,
    address_line1: address1,
    address_line2: address2,
  } = address;
  return { postal_code, address1, address2 };
});

export const {} = addressSlice.actions;
export default addressSlice.reducer;
