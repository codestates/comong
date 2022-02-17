import React from 'react';
import styled from 'styled-components';

const OauthImg = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

interface IOauthButton {
  type: string;
}

interface IOauthImgList {
  [index: string]: string;
  naver: string;
  kakao: string;
  google: string;
}

function OauthButton({ type }: IOauthButton) {
  const oauhthImgList: IOauthImgList = {
    naver: './img/OauthNaver.png',
    kakao: './img/OauthKakao.png',
    google: './img/OauthGoogle.png',
  };

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

  const getAuthorizationCode = (type: string) => {
    const redirectURL = process.env.REACT_APP_OAUTH_REDIRECT_URL;
    let requestURL = '';
    if (type === 'naver') {
      const STATE_STRING = makeRandomString(10);
      //!TODO STATE_STRING 세션에 저장하기
      console.log(STATE_STRING);
      requestURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${redirectURL}`;
    } else if (type === 'kakao') {
      requestURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code`;
      sessionStorage.setItem('oauth', 'kakao');
    } else if (type === 'google') {
      requestURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=code&redirect_uri=${redirectURL}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
      sessionStorage.setItem('oauth', 'google');
    }
    window.location.assign(requestURL);
  };

  return (
    <OauthImg
      src={oauhthImgList[type]}
      onClick={() => getAuthorizationCode(type)}
    />
  );
}

export default OauthButton;
