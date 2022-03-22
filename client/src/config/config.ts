export const config = {
  development: {
    url: 'https://api.comong.kr',
    redirectURL: 'https://comong.kr/join/oauth',
    oauth: {
      kakao: {
        clientId: process.env.REACT_APP_KAKAO_CLIENT_ID,
        clientSecret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
      },
      naver: {
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        clientSecret: process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
      google: {
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      },
    },
  },
};
