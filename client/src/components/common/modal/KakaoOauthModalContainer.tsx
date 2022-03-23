import React from 'react';
import styled from 'styled-components';
import { getAuthorizationCode } from '../../../apis/api/oauth';
import ButtonBasic from '../button/ButtonBasic';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'roboto', 'Noto Sans KR';
`;

const Text = styled.div`
  height: 30%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }

  p {
    margin-bottom: 0.4rem;
  }

  span {
    color: red;
  }
`;

interface ISellerJoinModalContent {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function KakaoOauthModalContainer({ setShowModal }: ISellerJoinModalContent) {
  return (
    <Wrapper>
      <Text>
        <p>카카오 회원가입 시,</p>
        <p>
          선택 정보 중 <span>이메일</span>에
        </p>
        <p>
          <span>반드시 체크</span>해주셔야 합니다.
        </p>
      </Text>
      <ButtonBasic
        type="small"
        buttonClickHandler={(e) => {
          setShowModal(false);
          getAuthorizationCode('kakao');
        }}
      >
        확인
      </ButtonBasic>
    </Wrapper>
  );
}
export default KakaoOauthModalContainer;
