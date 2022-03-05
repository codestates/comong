import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../../redux/configStore.hooks';
import BasicProfile from './BasicProfile';
import NavSeller from './NavSeller';
import NavUser from './NavUser';

const slideToLeftAni = keyframes`
  100%{
    transform: translateX(-100vw);
  }
`;

const slideToRightAni = keyframes`
  0%{
    transform: translateX(-100vw);
  }
`;

const Wrapper = styled.div`
  height: auto;
  background-color: white;
  z-index: 1;
  position: fixed;
  top: 70px;

  &.slideToLeft {
    animation: ${slideToLeftAni} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  &.slideToRight {
    animation: ${slideToRightAni} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  &.default {
    animation: none;
  }

  @media only screen and (max-width: 1200px) {
    height: 100vh;
    width: 22%;
    top: 100px;
    left: 0px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    overflow: scroll;
    padding: 0 20px 100px 20px;
    top: 60px;
  }
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px 0 0;
  text-align: end;
`;

const CloseBtn = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  padding: 4px;
  border-radius: 10px;
  background-color: #ffffff7d;
  img {
    width: 100%;
    height: 100%;
  }
`;

// @media only screen and (max-width: 1200px) {
// }
// @media only screen and (max-width: 768px) {
// }

interface IMypageAsideBar {
  setShowMenu: (value: boolean) => void;
  showMenu: boolean;
}
function MypageAsideBar({ setShowMenu, showMenu }: IMypageAsideBar) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isClicked, setIsClicked] = useState(false);
  const handleResize = () => setWidth(window.innerWidth);

  const slideLeft = () => {
    setShowMenu(false);
    !isClicked && setIsClicked(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Desktop = () => {
    return (
      <Wrapper>
        <BasicProfile></BasicProfile>
        {role === 0 ? <NavUser></NavUser> : <NavSeller></NavSeller>}
      </Wrapper>
    );
  };

  const Mobile = () => {
    return (
      <Wrapper
        className={
          (isClicked ? '' : 'default') +
          (showMenu ? 'slideToRight' : 'slideToLeft')
        }
      >
        <ButtonWrapper>
          <CloseBtn onClick={slideLeft}>
            <img src="/img/left-arrow-bold.png" />
          </CloseBtn>
        </ButtonWrapper>
        <BasicProfile></BasicProfile>
        {role === 0 ? <NavUser></NavUser> : <NavSeller></NavSeller>}
      </Wrapper>
    );
  };

  const { role } = useAppSelector((state) => state.userSlice);
  return <>{width > 768 ? Desktop() : Mobile()}</>;
}

export default MypageAsideBar;
