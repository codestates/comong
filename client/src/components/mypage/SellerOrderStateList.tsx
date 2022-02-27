import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  border-right: none;
`;

const SellerOrderStateWapper = styled.div`
  width: 20%;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};

  &:nth-child(2) {
    width: 60%;
    border-right: none;
    border-left: none;

    div:nth-child(2) {
      border-left: 1px solid ${(props) => props.theme.colors.lightGrey};
      border-right: 1px solid ${(props) => props.theme.colors.lightGrey};
    }
  }
`;

const SellerOrderState = styled.div`
  width: 100vw;
  height: 6vw;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media only screen and (max-width: 1200px) {
    padding: 5px 0 5px 20px;
    height: 8vw;
  }

  span.userOrder-title {
    font-size: 20px;
    font-weight: 700;

    @media only screen and (max-width: 1200px) {
      font-size: 16px;
    }
  }

  span.userOrder-content {
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};

    @media only screen and (max-width: 1200px) {
      font-size: 20px;
    }
  }
`;

function SellerOrderStateList() {
  return (
    <Wrapper>
      <SellerOrderStateWapper>
        <SellerOrderState>
          <span className="userOrder-title">신규주문</span>
          <span className="userOrder-content">0</span>
        </SellerOrderState>
      </SellerOrderStateWapper>
      <SellerOrderStateWapper>
        <SellerOrderState>
          <span className="userOrder-title">배송 준비 중</span>
          <span className="userOrder-content">0</span>
        </SellerOrderState>
        <SellerOrderState>
          <span className="userOrder-title">배송 중</span>
          <span className="userOrder-content">0</span>
        </SellerOrderState>
        <SellerOrderState>
          <span className="userOrder-title">배송 완료</span>
          <span className="userOrder-content">0</span>
        </SellerOrderState>
      </SellerOrderStateWapper>
      <SellerOrderStateWapper>
        <SellerOrderState>
          <span className="userOrder-title">취소/반품</span>
          <span className="userOrder-content">0</span>
        </SellerOrderState>
      </SellerOrderStateWapper>
    </Wrapper>
  );
}

export default SellerOrderStateList;
