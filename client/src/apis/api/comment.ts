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
