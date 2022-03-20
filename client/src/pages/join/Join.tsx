import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setClientHeadersToken } from '../../apis';
import {
  postOauthGoogle,
  postOauthKakao,
  postOauthNaver,
} from '../../apis/api/oauth';
import { LoadingIndicator } from '../../constants';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { postSigninAsync } from '../../redux/modules/userSlice';

const Main = styled.main`
  width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: 320px;
  }
`;

const Tabs = styled.div`
  height: 45px;
  margin: 50px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    margin: 40px 0;
  }
`;

const Tab = styled.div`
  text-align: center;
  padding: 15px 0;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  font-weight: 600;
  font-size: 14px;

  &.selected {
    background-color: ${(props) => props.theme.colors.accentColor};
    color: ${(props) => props.theme.colors.bgColor};
  }

  @media only screen and (max-width: 768px) {
    padding: 12px 0;
  }
`;

function Join() {
  const { pathname, search } = useLocation();
  const [role, setRole] = useState(0);
  const [basePath, setBasePath] = useState('/join');
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('pathname', pathname);
    if (pathname.includes('oauth')) {
      setBasePath(pathname);
      postOauth();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pathname.includes('seller')) {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [pathname]);

  const postOauth = async () => {
    const authorizationCode = search.split('code=')[1];
    const oauth = pathname.split('/')[2];
    let response;
    if (oauth === 'naver') {
      response = await postOauthNaver(authorizationCode);
    } else if (oauth === 'kakao') {
      response = await postOauthKakao(authorizationCode);
    } else {
      response = await postOauthGoogle(authorizationCode);
    }

    const { data, needSignup } = response;
    const { accessToken, email } = data;
    setClientHeadersToken(accessToken);
    if (!needSignup) {
      dispatch(postSigninAsync());
      navigate('/');
      return;
    } else {
      setIsLoading(false);
      setUserEmail(email);
    }
  };

  return isLoading ? (
    <LoadingIndicator></LoadingIndicator>
  ) : (
    <Main>
      <h1>회원가입</h1>
      <Tabs>
        <Link to={`${basePath}`}>
          <Tab className={role === 0 ? 'selected' : ''}>일반 회원</Tab>
        </Link>
        <Link to={`${basePath}/seller`}>
          <Tab className={role === 1 ? 'selected' : ''}>판매 회원</Tab>
        </Link>
      </Tabs>
      <Outlet context={userEmail} />
    </Main>
  );
}

export default Join;
