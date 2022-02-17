import { AxiosError } from 'axios';
import { apiClient, apiOauthClient } from '..';

export const postOauthNaver = async (code: string) => {
  // ! 네이버  - 개발 중 상태에서는 등록된 아이디만 로그인 가능
  try {
    const response = await apiOauthClient.post(`/oauth/naver`, {
      authorizationCode: code,
    });
    console.log('naver', response);
    return response.data.data;
  } catch (error) {}
};

export const postOauthKakao = async (code: string) => {
  try {
    const response = await apiOauthClient.post(`/oauth/kakao`, {
      authorizationCode: code,
    });
    console.log('kakao', response);
    return response.data.data;
  } catch (error) {}
};

export const postOauthGoogle = async (code: string) => {
  try {
    const response = await apiOauthClient.post(`/oauth/google`, {
      authorizationCode: code,
    });
    console.log('google', response);
    return response.data.data;
  } catch (error) {}
};
