import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { logout } from '../../redux/modules/userSlice';
import { MenuWrapper, MyMenu } from './NavUser';

const Wrapper = styled.div``;

function NavSeller() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MyMenu>MY MENU</MyMenu>
      <MenuWrapper>
        <h3>판매 관리</h3>
        <ul>
          <li>판매 현황</li>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>상품 관리</h3>
        <ul>
          <li>상품 등록</li>
          <li>등록한 상품</li>
          <li>상품 후기</li>
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
          <li>회원 정보 수정</li>
          <li
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            로그아웃
          </li>
        </ul>
      </MenuWrapper>
    </Wrapper>
  );
}

export default NavSeller;
