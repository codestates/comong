import React from 'react';
import styled from 'styled-components';

export const Button = styled.button<{
  backColor: string;
  textColor: string;
}>`
  width: 100%;
  height: 55px;
  background-color: ${(props) =>
    props.backColor ? props.backColor : props.theme.colors.accentColor};
  color: ${(props) =>
    props.textColor ? props.textColor : props.theme.colors.bgColor};
  border: ${(props) =>
    props.backColor === 'white' && `1px solid ${props.theme.colors.darkGrey}`};
  border-radius: 4px;
  font-family: 'roboto', 'Noto Sans KR';
  font-size: 1.2rem;
  font-weight: 400;

  @media only screen and (max-width: 768px) {
    height: 3rem;
    font-size: 1rem;
  }

  &.small {
    width: 90px;
    height: 45px;
    border-radius: 8px;
    font-size: 1rem;

    @media only screen and (max-width: 768px) {
      width: 70px;
      height: 40px;
      font-size: 14px;
    }
  }

  &.extraSmall {
    width: 50px;
    height: 30px;
    font-size: 14px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export interface ButtonBasicProps {
  type?: string;
  buttonClickHandler: React.MouseEventHandler;
  children: string;
  lightStyle?: boolean;
  backColor?: string;
  textColor?: string;
}

function ButtonBasic({
  type,
  buttonClickHandler,
  children,
  backColor,
  textColor,
}: ButtonBasicProps) {
  return (
    <Button
      className={type}
      onClick={buttonClickHandler}
      backColor={backColor!}
      textColor={textColor!}
    >
      {children}
    </Button>
  );
}

export default ButtonBasic;
