import React from 'react';
import styled, { css } from 'styled-components';
import SalesHistoryTableProperty from './SalesHistoryTableProperty';
import SalesHistoryTableRow from './SalesHistoryTableRow';

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

function SalesHistoryTable() {
  return (
    <Wrapper>
      <SalesHistoryTableProperty></SalesHistoryTableProperty>
      <SalesHistoryTableRow></SalesHistoryTableRow>
    </Wrapper>
  );
}

export default SalesHistoryTable;
