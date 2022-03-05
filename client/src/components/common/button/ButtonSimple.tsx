import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 25px;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  background-color: white;
  font-family: 'roboto', 'Noto Sans KR';
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    height: 1rem;
    font-size: 0.5rem;
  }
`;

interface ButtonBasicProps {
  buttonClickHandler: React.MouseEventHandler;
  children: string;
}

function ButtonSimple({ buttonClickHandler, children }: ButtonBasicProps) {
  return <Button onClick={buttonClickHandler}>{children}</Button>;
}

export default ButtonSimple;
