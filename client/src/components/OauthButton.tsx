import React from 'react';
import styled from 'styled-components';
import { config } from '../config/config';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';

const Wrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: pink;
  @media only screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

const OauthImg = styled.img`
  width: 100%;
  height: 100%;
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
  const dispatch = useAppDispatch();
  const oauhthImgList: IOauthImgList = {
    naver: '/img/OauthNaver.png',
    kakao: '/img/OauthKakao.png',
    google: '/img/OauthGoogle.png',
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

  return (
    <Wrapper>
      <OauthImg
        src={oauhthImgList[type]}
        onClick={() => getAuthorizationCode(type)}
      />
    </Wrapper>
  );
}

export default OauthButton;
