import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  height: 200px;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
`;
function OrderHistoryListItem() {
  return (
    <Wrapper>
      <div></div>
    </Wrapper>
  );
}

export default OrderHistoryListItem;
