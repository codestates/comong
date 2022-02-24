import React from 'react';
import styled from 'styled-components';
import SellerOrderStateList from '../../../components/mypage/SellerOrderStateList';
import SalesHistoryTable from './SalesHistoryTable';

const Wrapper = styled.div`
  padding: 60px 0;
  height: 100vh;
`;

const SliceHistoryWrapper = styled.div``;

function MypageSellerDefault() {
  return (
    <Wrapper>
      <SellerOrderStateList></SellerOrderStateList>
      <SliceHistoryWrapper>
        <h2>판매 현황</h2>
        <SalesHistoryTable></SalesHistoryTable>
      </SliceHistoryWrapper>
    </Wrapper>
  );
}

export default MypageSellerDefault;
