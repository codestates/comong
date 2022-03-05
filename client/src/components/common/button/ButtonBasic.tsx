import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ lightStyle: boolean; backColor: string }>`
  width: 100%;
  height: 55px;
  background-color: ${(props) =>
    props.backColor ? props.backColor : props.theme.colors.accentColor};
  font-size: ${(props) => (props.lightStyle ? '16px' : '18px')};
  font-weight: 400;
  color: ${(props) =>
    props.lightStyle
      ? props.theme.colors.textColor
      : props.theme.colors.bgColor};
  border-radius: 4px;
  font-family: 'roboto', 'Noto Sans KR';

  @media only screen and (max-width: 768px) {
    height: 50px;
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

interface ButtonBasicProps {
  type?: string;
  buttonClickHandler: React.MouseEventHandler;
  children: string;
  lightStyle?: boolean;
  backColor?: string;
}

function ButtonBasic({
  type,
  buttonClickHandler,
  children,
  lightStyle,
  backColor,
}: ButtonBasicProps) {
  return (
    <Button
      className={type}
      onClick={buttonClickHandler}
      lightStyle={lightStyle || false}
      backColor={backColor!}
    >
      {children}
    </Button>
  );
}

export default ButtonBasic;
