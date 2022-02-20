import { RecordWithTtl } from 'dns';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav``;

export const MyMenu = styled.div`
  height: 40px;
  background-color: ${(props) => props.theme.colors.accentColor};
  color: ${(props) => props.theme.colors.bgColor};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const MenuWrapper = styled.div`
  margin: 10px 20px;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  ul {
    padding: 15px 10px;
  }

  li {
    font-size: 16px;
    margin-bottom: 15px;

    &:hover {
      color: ${(props) => props.theme.colors.accentColor};
      cursor: pointer;
    }

    &.selected {
      color: ${(props) => props.theme.colors.accentColor};
    }
  }
`;

function NavUser() {
  const { pathname } = useLocation();

  const getSelectedClass = (path: string) => {
    if (pathname.includes(path)) return 'selected';
    return '';
  };

  return (
    <Wrapper>
      <MyMenu>MY MENU</MyMenu>
      <MenuWrapper>
        <h3>쇼핑</h3>
        <ul>
          <Link to="/mypage/userOrderHistory">
            <li className={getSelectedClass('userOrderHistory')}>주문 내역</li>
          </Link>
          <li>내가 쓴 후기</li>
          <li>찜 리스트</li>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>알림</h3>
        <ul>
          <li>알림</li>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>내 정보</h3>
        <ul>
          <Link to="/mypage/modifyInfo">
            <li className={getSelectedClass('modifyInfo')}>회원 정보 수정</li>
          </Link>
        </ul>
      </MenuWrapper>
    </Wrapper>
  );
}

export default NavUser;
