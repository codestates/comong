import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageAsideBar from '../../components/mypage/MypageAsideBar';

const Wrapper = styled.div`
  margin: 0 1%;
  padding: 100px 1%;

  display: flex;
  justify-content: center;
  gap: 70px;

  @media only screen and (max-width: 1200px) {
    justify-content: flex-start;
    padding-left: 20px;
    gap: 50px;
  }
`;

const Shadow = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 60px;
  background-color: ${(props) => props.theme.colors.darkGrey};
  opacity: 0.3;
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
`;

// @media only screen and (max-width: 1200px) {
// }
// @media only screen and (max-width: 768px) {
// }

const OutletWrapper = styled.div`
  width: 50%;

  &.modifyInfo {
    display: flex;
    justify-content: center;
    padding: 60px 0;
  }

  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 50px;
  }
`;

// 1. width가 태블릿이 되면 기본으로 햄버거 바가 보여야 함
// 2. 햄버거를 클릭했을 때, MypageAsideBar가 나와야 함
// 3. MypageAsideBar는 width에 따라 모양이 달라야 함
// 4. MypageAsideBar가 열려있을 때는 배경이 어두워야 함
// 4. MypageAsideBar의 close 버튼을 클릭하면 MypageAsideBar는 사라지고, 햄버거 버튼이 다시 생겨야 함

function Mypage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(width > 1200 ? true : false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => setWidth(window.innerWidth);

  return (
    <Wrapper>
      {showMenu || width > 1200 ? (
        <MypageAsideBar setShowMenu={setShowMenu}></MypageAsideBar>
      ) : (
        <MenuIcon onClick={() => setShowMenu(true)} src="./icons/menu.png" />
      )}
      {showMenu && width <= 1200 && <Shadow></Shadow>}
      <OutletWrapper
        className={pathname.includes('modifyInfo') ? 'modifyInfo' : ''}
      >
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
}

export default Mypage;
