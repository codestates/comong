import { apiClient } from '..';

export const getOrders = async (userId: number) => {
  const params = {
    user_id: userId,
  };

  try {
    const response = await apiClient.get('/orders', { params });
    let data = [];
    for (let key in response.data) {
      console.log(response.data[key].order_detail_info);
      data.push(...response.data[key].order_detail_info);
    }
    return data;
  } catch (error) {}
};
