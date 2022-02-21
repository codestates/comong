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
    return data;
  } catch (error) {}
};
