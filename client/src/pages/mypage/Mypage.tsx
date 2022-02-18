import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageAsideBar from '../../components/mypage/MypageAsideBar';

const Wrapper = styled.div`
  margin: 0 1%;
  padding: 100px 1%;

  display: flex;
  justify-content: center;
  gap: 70px;

  @media only screen and (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

// @media only screen and (max-width: 1200px) {
// }
// @media only screen and (max-width: 768px) {
// }

const OutletWrapper = styled.div`
  width: 50%;
  &.join {
    display: flex;
    justify-content: center;
  }
`;

function Mypage() {
  const { pathname } = useLocation();
  return (
    <Wrapper>
      <MypageAsideBar></MypageAsideBar>
      <OutletWrapper className={pathname.includes('join') ? 'join' : ''}>
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
}

export default Mypage;
