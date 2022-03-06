import { apiClient } from '..';

export type IPostCommentFormPartial = Partial<IPostCommentForm>;
export interface IPostCommentForm {
  contents: string;
  image_src: string[];
  score: number;
  order_detail_id: number;
  user_id: number;
}

export const postComments = async (form: IPostCommentForm) => {
  try {
    const json = { ...form, image_src: JSON.stringify(form.image_src) };
    const response = await apiClient.post('/comments', json);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (userid: number) => {
  try {
    const response = await apiClient.get(`/comments/user?user_id=${userid}`);
    const data = response.data.data;
    let result = [];
    for (let key in data) {
      delete data[key].orderDeailInfo;
      result.push(data[key]);
    }
    return result;
  } catch (error) {}
};

export const deleteComments = async (reviewId: number) => {
  try {
    const json = {
      item_review_id: reviewId,
    };
    const response = await apiClient.delete('/comments', { data: json });
    console.log(response.data);
    return;
  } catch (error) {}
};
