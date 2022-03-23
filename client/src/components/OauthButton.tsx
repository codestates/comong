import React from 'react';
import styled from 'styled-components';
import { getAuthorizationCode } from '../apis/api/oauth';

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
  const oauhthImgList: IOauthImgList = {
    naver: '/img/OauthNaver.png',
    kakao: '/img/OauthKakao.png',
    google: '/img/OauthGoogle.png',
  };

  return (
    <Wrapper>
      <OauthImg
        src={oauhthImgList[type]}
        onClick={() => {
          getAuthorizationCode(type);
        }}
      />
    </Wrapper>
  );
}

export default OauthButton;
