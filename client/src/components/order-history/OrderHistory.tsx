import React from 'react';
import styled from 'styled-components';
import ButtonBasic from '../common/button/ButtonBasic';
import OrderHistoryListItem from './OrderHistoryListItem';
import OrderHistorySearch from './OrderHistorySearch';

const OrderHistoryList = styled.ul``;

function OrderHistory() {
  // 조건 받는 곳
  // 뿌리는 곳
  const makeOrderHistoryListItem = () => {
    return <OrderHistoryListItem></OrderHistoryListItem>;
  };
  return (
    <div>
      <OrderHistorySearch></OrderHistorySearch>
      <OrderHistoryList>{makeOrderHistoryListItem()}</OrderHistoryList>
    </div>
  );
}

export default OrderHistory;
