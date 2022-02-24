import React from 'react';
import styled, { css } from 'styled-components';
import ButtonSimple from '../../../components/common/button/ButtonSimple';

const SalesHistoryListItem = styled.div`
  width: 100%;
  display: flex;
  > div {
    border-right: 1px solid black;
  }
  > div:last-child {
    border-right: none;
  }
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  ${center}
  &.order-date {
    width: 15%;
    flex-direction: column;
  }
  &.order-info {
    width: 40%;
    justify-content: space-around;
  }
  &.order-price {
    width: 15%;
    flex-direction: column;
  }
  &.order-status {
    width: 30%;
    justify-content: space-around;
  }
`;

const SalesImg = styled.img`
  width: 100px;
  height: 100px;
  background-color: orange;
`;

const SalesItemBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div``;

const SalesStatus = styled.div``;

function SalesHistoryTableRow() {
  return (
    <SalesHistoryListItem>
      <Div className="order-date">
        <span>2022.01.13</span>
        <span>주문번호</span>
      </Div>
      <Div className="order-info">
        <SalesImg></SalesImg>
        <SalesItemBasicInfo>
          <span className="item__title">판매 상품 제목 어쩌구</span>
        </SalesItemBasicInfo>
      </Div>
      <Div className="order-price">
        <span>800000원</span>
        <span>1개</span>
      </Div>
      <Div className="order-status">
        <SalesStatus>구매 확정</SalesStatus>
        <ButtonWrapper>
          <ButtonSimple buttonClickHandler={() => {}}>배송조회</ButtonSimple>
        </ButtonWrapper>
      </Div>
    </SalesHistoryListItem>
  );
}

export default SalesHistoryTableRow;
