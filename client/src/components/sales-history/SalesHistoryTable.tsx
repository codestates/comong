import React, { useState } from 'react';
import styled from 'styled-components';
import { ISalesList } from '../../pages/mypage/mypage_seller/MypageSellerDefault';
import SaleHistoryDetails from './SaleHistoryDetails';
import SalesHistoryTableProperty from './SalesHistoryTableProperty';
import SalesHistoryTableRow from './SalesHistoryTableRow';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

interface ISalesHistoryTable {
  salesList: ISalesList[];
}

function SalesHistoryTable({ salesList }: ISalesHistoryTable) {
  return (
    <Wrapper>
      <SalesHistoryTableProperty></SalesHistoryTableProperty>
      {salesList?.map((order) => {
        return <SalesHistoryTableRow order={order}></SalesHistoryTableRow>;
      })}
    </Wrapper>
  );
}

export default SalesHistoryTable;
