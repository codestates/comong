import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  font-family: roboto;
  border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
  background-color: white;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const NavMenuContainer = styled.div`
  margin: 8px 20px 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const NavMenu = styled.div<{
  categoryColor?: boolean;
  homeColor?: boolean;
  mypageColor?: boolean;
  cartColor?: boolean;
}>`
  cursor: pointer;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: ${(props) => props.homeColor && props.theme.colors.accentColor};
  color: ${(props) => props.categoryColor && props.theme.colors.accentColor};
  color: ${(props) => props.mypageColor && props.theme.colors.accentColor};
  color: ${(props) => props.cartColor && props.theme.colors.accentColor};
  &:hover {
    color: ${(props) => props.theme.colors.accentColor};
    transform: scale(1.05);
  }
`;
const NavMenuImg = styled.img`
  margin: auto;
  height: 32px;
`;
const NavMenuTitle = styled.p`
  text-align: center;
  margin-top: 8px;
  font-size: 11px;
  font-weight: bold;
`;

const MobileNav = () => {
  const navigate = useNavigate();

  let current = window.location.href.split('/')[3];

  const [homeColor, setHomeColor] = useState(false);
  const [categoryColor, setCategoryColor] = useState(false);
  const [mypageColor, setMypageColor] = useState(false);
  const [cartColor, setCartColor] = useState(false);

  // useEffect(() => {
  //   handleCurrentPageIconColor();
  // }, [current, homeColor, categoryColor, mypageColor, cartColor]);

  // const handleCurrentPageIconColor = () => {
  //   setHomeColor(false);
  //   setCategoryColor(false);
  //   setMypageColor(false);
  //   setCartColor(false);
  //   if (current === '') setHomeColor(true);
  //   else if (current === 'search') setCategoryColor(true);
  //   else if (current === 'mypage') setMypageColor(true);
  //   else if (current === 'cart') setCartColor(true);
  // };

  const handleHover = (el: string) => {
    console.log('handleHover-el', el);
    setHomeColor(false);
    setCategoryColor(false);
    setMypageColor(false);
    setCartColor(false);
    if (el === 'home') setHomeColor(true);
    else if (el === 'category') setCategoryColor(true);
    else if (el === 'mypage') setMypageColor(true);
    else if (el === 'cart') setCartColor(true);
  };
  const handleHoverOut = (el: string) => {
    console.log('handleHoverOut-el', el);

    if (el === 'home') setHomeColor(false);
    else if (el === 'category') setCategoryColor(false);
    else if (el === 'mypage') setMypageColor(false);
    else if (el === 'cart') setCartColor(false);
  };

  return (
    <NavContainer>
      <NavMenuContainer>
        <NavMenu
          onMouseOver={() => handleHover('home')}
          // onMouseLeave={() => handleHoverOut('home')}
          onMouseOut={() => handleHoverOut('home')}
          homeColor={homeColor}
          onClick={() => navigate('/')}
        >
          <NavMenuImg
            src={`/icons/mobilenav/${
              homeColor ? 'home-hover.png' : 'home.png'
            } `}
          />
          <NavMenuTitle>홈</NavMenuTitle>
        </NavMenu>
        <NavMenu
          onMouseOver={() => handleHover('category')}
          // onMouseLeave={() => handleHoverOut('category')}
          onMouseOut={() => handleHoverOut('category')}
          categoryColor={categoryColor}
          onClick={() => navigate('/search')}
        >
          <NavMenuImg
            src={`/icons/mobilenav/${
              categoryColor ? 'category-hover.png' : 'category.png'
            } `}
          />
          <NavMenuTitle>카테고리</NavMenuTitle>
        </NavMenu>
        <NavMenu
          onMouseOver={() => handleHover('mypage')}
          // onMouseLeave={() => handleHoverOut('mypage')}
          onMouseOut={() => handleHoverOut('mypage')}
          mypageColor={mypageColor}
          onClick={() => navigate('/mypage')}
        >
          <NavMenuImg
            src={`/icons/mobilenav/${
              mypageColor ? 'mypage-hover.png' : 'mypage.png'
            } `}
          />
          <NavMenuTitle>마이페이지</NavMenuTitle>
        </NavMenu>
        <NavMenu
          onMouseOver={() => handleHover('cart')}
          // onMouseLeave={() => handleHoverOut('cart')}
          onMouseOut={() => handleHoverOut('cart')}
          cartColor={cartColor}
          onClick={() => navigate('/cart')}
        >
          <NavMenuImg
            src={`/icons/mobilenav/${
              cartColor ? 'cart-hover.png' : 'cart.png'
            } `}
          />
          <NavMenuTitle>장바구니</NavMenuTitle>
        </NavMenu>
      </NavMenuContainer>
    </NavContainer>
  );
};

export default MobileNav;
