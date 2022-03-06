import styled, { keyframes } from 'styled-components';
import NavSearch from './NavSearch';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { NavCartModal } from './Modals/NavCartModal';
import type { RootState } from '../redux/configStore';
import NotificationNum from './notifications/NotificationNum';

const NavContainer = styled.div`
  width: 100%;
  height: 65px;
  position: fixed;
  z-index: 10;
  top: 0;
  font-family: roboto;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  background-color: white;
`;
const NavLinks = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  max-width: 1600px;
`;
const logoAnimation = keyframes`
  25%{
    transform: translateX(-50px);
    opacity: 0;
  }
  50%{
    transform: translateX(50px);
    opacity: 0;
  }
`;
const spanAnimation = keyframes`
  100%{
    opacity: 1;
    letter-spacing: 0.4rem;
    padding-left: 0.4rem;
  }
`;
const Logo = styled.div`
  display: flex;
  margin: 1 auto;
  align-items: center;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 35px;
  font-weight: bold;
  @media only screen and (max-width: 1200px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 25px;
  }
`;
const LogoWrapper = styled.div`
  position: relative;
  cursor: pointer;
  span {
    font-size: 0.8rem;
    position: absolute;
    width: 100%;
    text-align: center;
    opacity: 0;
    letter-spacing: 0.1rem;
  }
  &:hover ${Logo} {
    animation: ${logoAnimation} 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  &:hover span {
    animation: ${spanAnimation} 1s ease-in-out;
    animation-fill-mode: forwards;
    @media only screen and (max-width: 1200px) {
      animation: none;
    }
  }
`;
const NavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavMenu = styled.div<{
  categoryColor?: boolean;
  mypageColor?: boolean;
  cartColor?: boolean;
}>`
  position: relative;
  cursor: pointer;
  margin: 0.5rem;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.categoryColor && props.theme.colors.accentColor};
  color: ${(props) => props.mypageColor && props.theme.colors.accentColor};
  color: ${(props) => props.cartColor && props.theme.colors.accentColor};
  @media only screen and (max-width: 1200px) {
    font-size: 13.5px;
    font-weight: bold;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  :hover {
    color: ${(props) => props.theme.colors.accentColor};
    transform: scale(1.04);
  }
`;

const NavNotification = styled.img`
  cursor: pointer;
  margin-left: 30px;
  width: 28px;
  &:hover {
    transform: scale(1.08);
  }
`;

const Nav = () => {
  const navigate = useNavigate();
  const { isLogin, role } = useAppSelector((state) => state.userSlice);

  const [categoryColor, setCategoryColor] = useState(false);
  const [mypageColor, setMypageColor] = useState(false);
  const [cartColor, setCartColor] = useState(false);

  let current = window.location.href.split('/')[3];

  useEffect(() => {
    handleCurrentPageIconColor();
  }, [current]);

  const handleCurrentPageIconColor = () => {
    setCartColor(false);
    setMypageColor(false);
    setCategoryColor(false);

    if (current === 'search') setCategoryColor(true);
    if (current === 'login') setMypageColor(true);
    if (current === 'cart') setCartColor(true);
  };

  return (
    <NavContainer>
      <NavLinks>
        <LogoWrapper>
          <Logo onClick={() => navigate('/')}>COMONG</Logo>
          <span>당신의오픈마켓</span>
        </LogoWrapper>
        <NavSearch />
        <NavMenuContainer>
          <NavMenu
            categoryColor={categoryColor}
            onClick={() => navigate('/search')}
          >
            검색
          </NavMenu>
          <NavMenu
            mypageColor={mypageColor}
            onClick={() =>
              isLogin
                ? role === 0
                  ? navigate('/mypage')
                  : navigate('/sellerpage')
                : navigate('/login')
            }
          >
            {isLogin ? '마이페이지' : '로그인'}
          </NavMenu>
          <NavMenu cartColor={cartColor} onClick={() => navigate('/cart')}>
            장바구니{' '}
          </NavMenu>
          <NavMenu
            onClick={() =>
              isLogin
                ? role === 0
                  ? navigate('/mypage/notifications')
                  : navigate('/sellerpage/notifications')
                : navigate('/login')
            }
          >
            <NavNotification src="/icons/nav/bell.png" />
            {isLogin && <NotificationNum></NotificationNum>}
          </NavMenu>
        </NavMenuContainer>
      </NavLinks>
    </NavContainer>
  );
};

export default Nav;
