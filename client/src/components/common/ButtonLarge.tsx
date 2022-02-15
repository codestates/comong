import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${(props) => props.theme.colors.accentColor};
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.bgColor};
  border-radius: 4px;

  &.email {
    width: 90px;
    height: 45px;
    border-radius: 8px;
    font-size: 1rem;
  }
`;

interface ButtonProps {
  type?: string;
  buttonClickHandler: React.MouseEventHandler;
  children: string;
}

function ButtonLarge({ type, buttonClickHandler, children }: ButtonProps) {
  return (
    <Button className={type} onClick={buttonClickHandler}>
      {children}
    </Button>
  );
}

export default ButtonLarge;
