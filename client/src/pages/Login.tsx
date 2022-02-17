import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ButtonBasic from '../components/common/ButtonBasic';
import LoginForm from '../components/form/LoginForm';
import OauthButton from '../components/OauthButton';
import { useAppSelector } from '../redux/configStore.hooks';
import { logout } from '../redux/modules/userSlice';

const Main = styled.main`
  width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: 320px;
  }
`;

const Text = styled.p`
  margin: 60px 0;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const OauthLoginWrapper = styled.div`
  display: flex;
`;

function Login() {
  const dispatch = useDispatch();
  const { isLogin } = useAppSelector((state) => state.userSlice);

  return isLogin ? (
    <Main>
      <span>로그인하셨습니다</span>
      <ButtonBasic type="small" buttonClickHandler={() => dispatch(logout())}>
        로그아웃
      </ButtonBasic>
    </Main>
  ) : (
    <Main>
      <Text>
        <span>어쩌구 저쩌구 홍보문구입니다</span>
        <span>코몽을 이용해보세요 너무 좋습니다</span>
      </Text>
      <LoginForm></LoginForm>
      <ButtonBasic buttonClickHandler={() => {}}>
        테스트 계정으로 시작하기
      </ButtonBasic>
      <ButtonBasic buttonClickHandler={() => {}}>이메일로 가입하기</ButtonBasic>
      <OauthLoginWrapper>
        <OauthButton type="naver"></OauthButton>
        <OauthButton type="kakao"></OauthButton>
        <OauthButton type="google"></OauthButton>
      </OauthLoginWrapper>
    </Main>
  );
}

export default Login;
