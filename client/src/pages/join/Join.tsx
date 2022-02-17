import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { apiClient } from '../../apis';
import {
  postOauthGoogle,
  postOauthKakao,
  postOauthNaver,
} from '../../apis/api/oauth';

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
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (pathname.includes('oauth')) {
      setBasePath('/join/oauth');
      postOauth();
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
    const authorizationCode = search.split('=')[1];
    const oauth = sessionStorage.getItem('oauth');
    if (oauth === 'naver') {
      const data = await postOauthNaver(authorizationCode);
      console.log(data);
    } else if (oauth === 'kakao') {
      const { accessToken, email } = await postOauthKakao(authorizationCode);
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `bearer ${accessToken}`;
      setUserEmail(email);
    } else {
      const { accessToken, email } = await postOauthGoogle(authorizationCode);
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `bearer ${accessToken}`;
      setUserEmail(email);
    }
  };

  return (
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
