import React from 'react';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  height: 45px;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.textColor};

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

interface InputBasicProps {
  name?: string;
  type: string;
  title: string;
  placeholder?: string;
  fillJoinForm?: React.FormEventHandler;
  message?: string;
}

function InputBasic({
  name,
  type,
  title,
  placeholder,
  fillJoinForm,
  message,
}: InputBasicProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={fillJoinForm}
      />
      <ErrorMessage>{message}</ErrorMessage>
    </Wrapper>
  );
}

export default InputBasic;
