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
  setModalType?: React.Dispatch<React.SetStateAction<string>>;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOauthImgList {
  [index: string]: string;
  naver: string;
  kakao: string;
  google: string;
}

function OauthButton({ type, setModalType, setShowModal }: IOauthButton) {
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
          if (type === 'kakao') {
            setModalType && setModalType(type);
            setShowModal && setShowModal(true);
            return;
          }
          getAuthorizationCode(type);
        }}
      />
    </Wrapper>
  );
}

export default OauthButton;
