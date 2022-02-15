import { apiClient } from '..';

export const getItems = async () => {
  try {
    const data = await apiClient.get('/items');
    return data;
  } catch (err) {
    console.log(err);
  }
};
