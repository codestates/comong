import { apiClient } from '..';
import { config } from '../../config/config';

const makeRandomString = (num: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getAuthorizationCode = (type: string) => {
  const env = 'development';
  const { naver, kakao, google } = config[env].oauth;
  let { redirectURL } = config[env];
  redirectURL += `/${type}`;
  let requestURL = '';
  if (type === 'naver') {
    const STATE_STRING = makeRandomString(10);
    console.log(STATE_STRING);
    requestURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver.clientId}&state=${STATE_STRING}&redirect_uri=${redirectURL}`;
  } else if (type === 'kakao') {
    requestURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientId}&redirect_uri=${redirectURL}&response_type=code`;
  } else if (type === 'google') {
    requestURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=code&redirect_uri=${redirectURL}&client_id=${google.clientId}`;
  }
  console.log(requestURL);
  window.location.assign(requestURL);
};

export const postOauthJoin = async (type: string, code: string) => {
  try {
    const response = await apiClient.post(`/oauth/${type}`, {
      authorizationCode: code,
    });
    console.log(`type`, response);
    return response.data;
  } catch (error) {}
};
