import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
`;

const Input = styled.input`
  height: 45px;
  padding: 1rem;
  margin-bottom: 4px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.textColor};
`;

function InputAdress() {
  return (
    <Wrapper>
      <Title>배송지</Title>
      <Input placeholder="주소" />
      <Input placeholder="상세주소" />
    </Wrapper>
  );
}

export default InputAdress;
