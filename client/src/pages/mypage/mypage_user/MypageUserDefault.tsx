import React from 'react';
import styled from 'styled-components';
import OrderHistory from '../../../components/common/order-history/OrderHistory';

const Wrapper = styled.div`
  padding: 60px 0;

  height: 100vh;
`;

const UserOrderStateWrapper = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  border-right: none;
`;

const UserOrderState = styled.div`
  width: 100vw;
  height: 6vw;
  padding: 10px 0 10px 40px;
  border-right: 1px solid ${(props) => props.theme.colors.darkGrey};
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
          <span className="userOrder-content">0P</span>
        </UserOrderState>
        <UserOrderState>
          <span className="userOrder-title">취소 완료</span>
          <span className="userOrder-content">0</span>
        </UserOrderState>
      </UserOrderStateWrapper>
    </Wrapper>
  );
}

export default MypageUserDefault;
