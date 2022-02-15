import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// 여기서 가져아할 게 판매회원, 일반회원 탭 상태

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
  const { pathname } = useLocation();
  const [role, setRole] = useState(0);

  useEffect(() => {
    if (pathname === '/join') {
      setRole(0);
    } else {
      setRole(1);
    }
  }, [pathname]);

  return (
    <Main>
      <h1>회원가입</h1>
      <Tabs>
        <Link to="">
          <Tab className={role === 0 ? 'selected' : ''}>일반 회원</Tab>
        </Link>
        <Link to="seller">
          <Tab className={role === 1 ? 'selected' : ''}>판매 회원</Tab>
        </Link>
      </Tabs>
      <Outlet />
    </Main>
  );
}

export default Join;
