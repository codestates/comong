import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOrders } from '../../../apis/api/order';
import OrderHistory, {
  IOrderData,
} from '../../../components/order-history/OrderHistory';
import { useAppSelector } from '../../../redux/configStore.hooks';

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
  const orderType: { [key: string]: string } = {
    pending: '결제확인중',
    processing: '배송준비중',
    intransit: '배송중',
    delivered: '배송완료',
  };

  const [orderStatusNum, setOrderStatusNum] = useState<{
    [key: string]: number;
  }>({
    pending: 0,
    processing: 0,
    intransit: 0,
    delivered: 0,
  });

  const showStatus = () => {
    let result = [];
    for (let key in orderType) {
      result.push(
        <UserOrderState>
          <span className="userOrder-title">{orderType[key]}</span>
          <span className="userOrder-content">{orderStatusNum[key]}</span>
        </UserOrderState>,
      );
    }
    return result;
  };

  return (
    <Wrapper>
      <UserOrderStateWrapper>{showStatus()}</UserOrderStateWrapper>
      <UserOrderHistoryWrapper>
        <h2>최근 주문 내역</h2>
        <OrderHistory
          orderStatusNum={orderStatusNum}
          setOrderStatusNum={setOrderStatusNum}
        ></OrderHistory>
      </UserOrderHistoryWrapper>
    </Wrapper>
  );
}

export default MypageUserDefault;
