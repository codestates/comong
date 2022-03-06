import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import MypageAsideBar from '../../components/mypage/MypageAsideBar';

const Wrapper = styled.div`
  height: auto;
  max-width: 1240px;
  margin: 0 auto;
  padding: 100px 0;
  display: flex;
  justify-content: space-around;
  font-family: 'roboto', 'Noto Sans KR';

  @media only screen and (max-width: 1200px) {
    padding: 100px 1%;
  }
  // @media only screen and (max-width: 768px) {
  // }

  div.menuIcon {
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 80px;
    left: 10px;
    padding: 4px;
    border-radius: 10px;
    background-color: #ffffff7d;
  }
`;

const NavWrapper = styled.div`
  position: relative;
  width: 20%;
  height: 100vh;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 0;
  }
`;

const MenuIcon = styled.img`
  width: 100%;
  height: 100%;
`;

// @media only screen and (max-width: 1200px) {
// }
// @media only screen and (max-width: 768px) {
// }

const OutletWrapper = styled.div`
  width: 80%;
  padding: 0 2%;

  @media only screen and (max-width: 1500px) {
    padding: 0 4%;
  }

  @media only screen and (max-width: 1200px) {
    width: 75%;
    padding: 0 20px;
    margin-left: 0;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 0.5rem;
    padding-top: 2rem;
  }

  &.modifyInfo {
    display: flex;
    justify-content: center;
    padding: 60px 0;
    @media only screen and (max-width: 768px) {
      margin-top: 2rem;
      padding: 0 1rem;
    }
  }
`;

// 1. width가 태블릿이 되면 기본으로 햄버거 바가 보여야 함
// 2. 햄버거를 클릭했을 때, MypageAsideBar가 나와야 함
// 3. MypageAsideBar는 width에 따라 모양이 달라야 함
// 4. MypageAsideBar가 열려있을 때는 배경이 어두워야 함
// 4. MypageAsideBar의 close 버튼을 클릭하면 MypageAsideBar는 사라지고, 햄버거 버튼이 다시 생겨야 함

function Mypage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => setWidth(window.innerWidth);
  const slideRight = () => {
    setShowMenu(true);
  };

  return (
    <Wrapper>
      <NavWrapper>
        {
          <>
            <MypageAsideBar
              setShowMenu={setShowMenu}
              showMenu={showMenu}
            ></MypageAsideBar>
            {width <= 768 && (
              <div className={'menuIcon'}>
                <MenuIcon onClick={slideRight} src="/icons/menu.png" />
              </div>
            )}
          </>
        }
      </NavWrapper>
      <OutletWrapper
        className={pathname.includes('modifyInfo') ? 'modifyInfo' : ''}
      >
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
}

export default Mypage;
