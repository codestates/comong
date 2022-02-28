import React from 'react';
import styled from 'styled-components';
import ButtonBasic from '../common/button/ButtonBasic';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 5rem 2rem 5rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.colors.greyForBackGround};

  h3 {
    font-weight: 700;
    font-size: 16px;
  }

  select {
    padding: 0.2rem 0.3rem;
  }

  input {
    width: 30%;
    padding: 0.3rem 0.5rem;
    border: 1px solid black;
    border-radius: 4px;
  }
`;

function SalesHistoryTrackingNum() {
  return (
    <Wrapper>
      <h3>송장 번호</h3>
      <select name="pets" id="pet-select">
        <option value="">--배송업체--</option>
        <option value="cj대한통운">cj대한통운</option>
      </select>
      <input placeholder="송장번호" />
      <ButtonBasic type="extraSmall" buttonClickHandler={() => {}}>
        등록
      </ButtonBasic>
    </Wrapper>
  );
}

export default SalesHistoryTrackingNum;
