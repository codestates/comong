import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configStore.hooks';
import BasicProfile from './BasicProfile';
import NavSeller from './NavSeller';
import NavUser from './NavUser';

const Wrapper = styled.div`
  height: auto;
  background-color: white;
  z-index: 1;
  position: fixed;
  top: 70px;

  @media only screen and (max-width: 1200px) {
    height: 100vh;
    width: 18%;
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

const CloseBtn = styled.div``;

// @media only screen and (max-width: 1200px) {
// }
// @media only screen and (max-width: 768px) {
// }

interface IMypageAsideBar {
  setShowMenu?: (value: boolean) => void;
}
function MypageAsideBar({ setShowMenu }: IMypageAsideBar) {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);

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

  const Tablet = () => {
    return (
      <Wrapper>
        <ButtonWrapper>
          <CloseBtn onClick={() => setShowMenu!(false)}>X</CloseBtn>
        </ButtonWrapper>
        <BasicProfile></BasicProfile>
        {role === 0 ? <NavUser></NavUser> : <NavSeller></NavSeller>}
      </Wrapper>
    );
  };

  const { role } = useAppSelector((state) => state.userSlice);
  return <>{width > 1200 ? Desktop() : Tablet()}</>;
}

export default MypageAsideBar;
