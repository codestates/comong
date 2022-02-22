import React from 'react';
import styled from 'styled-components';
import { MenuWrapper, MyMenu } from './NavUser';

const Wrapper = styled.div``;

function NavSeller() {
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
        <h3>분석</h3>
        <ul>
          <li>구매 분석</li>
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
        </ul>
      </MenuWrapper>
    </Wrapper>
  );
}

export default NavSeller;
