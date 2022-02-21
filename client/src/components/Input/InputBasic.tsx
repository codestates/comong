import React, { useState } from 'react';
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

export const Input = styled.input`
  height: 45px;
  padding: 1rem;
  margin-bottom: 8px;
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
  value?: string;
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
  value,
  message,
}: InputBasicProps) {
  const replaceTextToEmpty = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onInput={(e) => name === 'phone' && replaceTextToEmpty(e)}
        onChange={fillJoinForm}
      />
      {<ErrorMessage>{message}</ErrorMessage>}
    </Wrapper>
  );
}

export default InputBasic;
