import styled from 'styled-components';
import NavSearch from './NavSearch';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/configStore.hooks';

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
const Logo = styled.div`
  cursor: pointer;
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
  &:hover {
    transform: scale(1.05);
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
  &:hover {
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
  const { isLogin } = useAppSelector((state) => state.userSlice);

  const [categoryColor, setCategoryColor] = useState(false);
  const [mypageColor, setMypageColor] = useState(false);
  const [cartColor, setCartColor] = useState(false);

  useEffect(() => {
    handleCurrentPageIconColor();
  }, [categoryColor, mypageColor, cartColor]);

  const handleCurrentPageIconColor = () => {
    let current = window.location.href.split('/')[3];
    console.log(window.location.href.split('/'));
    console.log(current.length);
    if (current === 'search') setCategoryColor(true);
    else if (current === 'login') setMypageColor(true);
    else if (current === 'cart') setCartColor(true);
  };

  return (
    <NavContainer>
      <NavLinks>
        <Logo onClick={() => navigate('/')}>COMONG</Logo>
        <NavSearch />
        <NavMenuContainer>
          <NavMenu
            categoryColor={categoryColor}
            onClick={() => navigate('/search')}
          >
            글쓰기(임시)
          </NavMenu>
          <NavMenu
            mypageColor={mypageColor}
            onClick={() => (isLogin ? navigate('/mypage') : navigate('/login'))}
          >
            마이페이지{' '}
          </NavMenu>
          <NavMenu cartColor={cartColor} onClick={() => navigate('/cart')}>
            장바구니{' '}
          </NavMenu>
          <NavNotification src="/icons/nav/bell.png" />
        </NavMenuContainer>
      </NavLinks>
    </NavContainer>
  );
};

export default Nav;
