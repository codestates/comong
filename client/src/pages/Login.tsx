import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ButtonBasic from '../components/common/button/ButtonBasic';
import Modal from '../components/common/modal/Modal';
import TestLoginModalContainer from '../components/common/modal/TestLoginModalContainer';
import LoginForm from '../components/form/LoginForm';
import OauthButton from '../components/OauthButton';
import { LoadingIndicator } from '../constants';
import { useAppSelector } from '../redux/configStore.hooks';
import { logout } from '../redux/modules/userSlice';

const Main = styled.main`
  width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: 'roboto', 'Noto Sans KR';

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const logoAnimation = keyframes`
  0%{
    transform:translateY(0.5rem);
    opacity: 0;
  }
`;

const LogoWrapper = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  color: black;
  animation: ${logoAnimation} 1.8s linear;
  animation-fill-mode: forwards;
  @media only screen and (max-width: 768px) {
    height: 140px;
  }
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 4.7rem;
  font-weight: bold;
  letter-spacing: 0.7rem;
  @media only screen and (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Text = styled.span`
  text-align: center;
  letter-spacing: 1rem;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.darkGrey};
  border-bottom: 1px solid ${(props) => props.theme.colors.darkGrey};
`;

const OauthLoginWrapper = styled.div`
  margin-top: 2rem;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
`;

function Login() {
  const dispatch = useDispatch();
  const { isLogin, isLoading } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return isLoading ? (
    <LoadingIndicator></LoadingIndicator>
  ) : isLogin ? (
    <Main>
      <span>로그인하셨습니다</span>
      <ButtonBasic type="small" buttonClickHandler={() => dispatch(logout())}>
        로그아웃
      </ButtonBasic>
    </Main>
  ) : (
    <Main>
      <LogoWrapper>
        <Logo>COMONG</Logo>
        <Text>당신의오픈마켓</Text>
      </LogoWrapper>
      <LoginForm></LoginForm>
      <ButtonWrapper>
        <ButtonBasic
          backColor="#fc6621"
          buttonClickHandler={() => {
            setShowModal(true);
          }}
        >
          테스트 계정으로 시작하기
        </ButtonBasic>
        <ButtonBasic
          backColor="#B8B8B8"
          buttonClickHandler={() => {
            navigate('/join');
          }}
        >
          이메일로 가입하기
        </ButtonBasic>
      </ButtonWrapper>
      <OauthLoginWrapper>
        <OauthButton type="naver"></OauthButton>
        <OauthButton type="kakao"></OauthButton>
        <OauthButton type="google"></OauthButton>
      </OauthLoginWrapper>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <TestLoginModalContainer
            setShowModal={setShowModal}
          ></TestLoginModalContainer>
        </Modal>
      )}
    </Main>
  );
}

export default Login;
