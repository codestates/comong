import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  height: 200px;
  padding: 0 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
`;

const OrderImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
`;

const OrderInfo = styled.div`
  width: 60%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  background-color: pink;
`;

const OrderItemInfo = styled.div`
  width: 70%;
  height: 100px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: cadetblue;

  span.item__title {
    font-size: 20px;
  }

  div.item__price-date-wrapper {
    width: 50%;
    display: flex;
    justify-content: space-between;
    background-color: coral;
  }

  span.item__price {
    font-size: 16px;
  }

  span.item__date {
    font-size: 16px;
    color: ${(props) => props.theme.colors.lightGrey};
  }

  span.item__status {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};
  }
`;

const OrderSellerInfo = styled.div`
  width: 20%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background-color: cadetblue;

  span.seller__name {
    font-size: 18px;
  }

  span.seller__contact {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  width: 15%;
  height: 100px;
  background-color: orange;
`;

function OrderHistoryListItem() {
  return (
    <Wrapper>
      <OrderImg></OrderImg>
      <OrderInfo>
        <OrderItemInfo>
          <span className="item__title">판매 상품 제목</span>
          <div className="item__price-date-wrapper">
            <span className="item__price">판매 가격</span>
            <span className="item__date">구매 날짜</span>
          </div>
          <span className="item__status">주문 상태</span>
        </OrderItemInfo>
        <OrderSellerInfo>
          <span className="seller__name">판매자</span>
          <span className="seller__contact">판매자 연락처</span>
        </OrderSellerInfo>
      </OrderInfo>
      <ButtonWrapper></ButtonWrapper>
    </Wrapper>
  );
}

export default OrderHistoryListItem;
