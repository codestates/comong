import { apiClient } from '..';
import { IOrderData } from '../../components/order-history/OrderHistory';

export interface IGetOrderParams {
  user_id: number;
  shipping_status?: string;
  start?: string;
  end?: string;
}

export const getOrders = async (params: IGetOrderParams) => {
  try {
    const response = await apiClient.get('/orders', { params });
    let data: IOrderData[] = [];
    for (let key in response.data) {
      data.push(...response.data[key].order_detail_info);
    }
    console.log(data);
    return data;
  } catch (error) {}
};

export const getOrdersSeller = async (params: IGetOrderParams) => {
  try {
    const response = await apiClient.get('/orders/seller', { params });
    const data = response.data;
    let result = [];
    for (let key in data) {
      result.push(data[key]);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export interface IPatchOrderParams {
  order_id: string;
  status?: string;
  shipping_status?: string;
  shipping_company?: string;
  shipping_code?: string;
}

export const patchOrdersSeller = async (payload: IPatchOrderParams) => {
  try {
    console.log(payload);
    await apiClient.patch('/orders', payload);
    return;
  } catch (error) {
    console.log(error);
  }
};
