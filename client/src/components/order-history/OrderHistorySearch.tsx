import React from 'react';
import styled from 'styled-components';
import ButtonBasic from '../common/button/ButtonBasic';

const Wrapper = styled.div`
  height: 60px;
  margin: 40px 0;
  background-color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

function OrderHistorySearch() {
  return (
    <Wrapper>
      <select name="orderStatus">
        <option value="">전체</option>
        <option value="pick-up available">픽업 가능</option>
        <option value="processing">배송 대기 중</option>
        <option value="intransit">배송 중</option>
        <option value="delivered">배송 완료</option>
        <option value="canceled">취소</option>
        <option value="returned">환불</option>
      </select>
      <input type="date" />
      <span>~</span>
      <input type="date" />
      <ButtonBasic type="extraSmall" buttonClickHandler={() => {}}>
        조회
      </ButtonBasic>
    </Wrapper>
  );
}

export default OrderHistorySearch;
