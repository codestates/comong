import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 90%;
  height: 25px;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
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
