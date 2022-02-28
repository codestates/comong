import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.darkGrey};
`;

export const cellWidth = css`
  &.order-date {
    width: 15%;
  }
  &.order-info {
    width: 50%;
  }
  &.order-price {
    width: 12%;
  }
  &.order-status {
    width: 13%;
  }
  &.order-cancel {
    width: 10%;
  }
`;

const Div = styled.div`
  ${cellWidth}
  display: flex;
  justify-content: center;
`;

function SalesHistoryTableProperty() {
  return (
    <Wrapper>
      <Div className="order-date">주문일자</Div>
      <Div className="order-info">상품/주문정보</Div>
      <Div className="order-price">주문금액</Div>
      <Div className="order-status">진행상태</Div>
      <Div className="order-cancel">취소/반품</Div>
    </Wrapper>
  );
}

export default SalesHistoryTableProperty;
