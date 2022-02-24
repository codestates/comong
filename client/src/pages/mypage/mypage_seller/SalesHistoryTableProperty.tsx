import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.darkGrey};
`;

const Div = styled.div`
  display: flex;
  justify-content: center;

  &.order-date {
    width: 15%;
  }
  &.order-info {
    width: 40%;
  }
  &.order-price {
    width: 15%;
  }
  &.order-status {
    width: 30%;
  }
`;

function SalesHistoryTableProperty() {
  return (
    <Wrapper>
      <Div className="order-date">주문일자</Div>
      <Div className="order-info">상품/주문정보</Div>
      <Div className="order-price">주문금액(수량)</Div>
      <Div className="order-status">진행상태</Div>
    </Wrapper>
  );
}

export default SalesHistoryTableProperty;
