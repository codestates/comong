import React from 'react';
import styled from 'styled-components';
import OrderHistory from '../../../components/order-history/OrderHistory';

const Wrapper = styled.div`
  padding: 2rem 0;
  height: 100vh;
`;

const UserOrderStateWrapper = styled.div`
  display: flex;
  /* border: 1px solid ${(props) => props.theme.colors.darkGrey};
  border-right: none; */
`;

const UserOrderState = styled.div`
  width: 100%;
  padding: 1.5rem;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 1200px) {
    padding: 5px 0;
    height: 8vw;
  }

  span.userOrder-title {
    font-size: 1.2rem;
    font-weight: 700;

    @media only screen and (max-width: 1200px) {
      font-size: 16px;
    }
  }

  span.userOrder-content {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};

    @media only screen and (max-width: 1200px) {
      font-size: 20px;
    }
  }
`;

const UserOrderHistoryWrapper = styled.div`
  margin-top: 5rem;
  @media only screen and (max-width: 768px) {
    margin-top: 4rem;
  }

  h2 {
    margin-bottom: 20px;
  }
`;

function MypageUserDefault() {
  return (
    <Wrapper>
      <UserOrderStateWrapper>
        <UserOrderState>
          <span className="userOrder-title">적립금</span>
          <span className="userOrder-content">0P</span>
        </UserOrderState>
        <UserOrderState>
          <span className="userOrder-title">할인 쿠폰</span>
          <span className="userOrder-content">0</span>
        </UserOrderState>
        <UserOrderState>
          <span className="userOrder-title">발송 완료</span>
          <span className="userOrder-content">0</span>
        </UserOrderState>
        <UserOrderState>
          <span className="userOrder-title">취소 완료</span>
          <span className="userOrder-content">0</span>
        </UserOrderState>
      </UserOrderStateWrapper>
      <UserOrderHistoryWrapper>
        <h2>최근 주문 내역</h2>
        <OrderHistory></OrderHistory>
      </UserOrderHistoryWrapper>
    </Wrapper>
  );
}

export default MypageUserDefault;
