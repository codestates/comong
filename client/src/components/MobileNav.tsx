import { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  font-family: roboto;
  border-top: 1px solid #e2e2e2;
  background-color: #ffffff;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const NavMenuContainer = styled.div`
  margin: 5px 20px 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const NavMenu = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: #323232;
  :hover {
    color: #358bca;
  }
`;
const NavMenuImg = styled.img`
  margin: auto;
  height: 32px;
`;
const NavMenuTitle = styled.p`
  text-align: center;
  margin-top: 8px;
  /* margin-bottom: 2px; */

  font-size: 11px;
  font-weight: bold;
`;

const Nav = () => {
  const [homeColor, setHomeColor] = useState(false);

  const handleHover = (el: string) => {
    if (el === 'home') setHomeColor(true);
  };
  const handleHoverOut = (el: string) => {
    if (el === 'home') setHomeColor(false);
  };

  return (
    <NavContainer>
      <NavMenuContainer>
        <NavMenu
          onMouseOver={() => handleHover('home')}
          onMouseLeave={() => handleHoverOut('home')}
        >
          <NavMenuImg
            src={`/icons/mobileNav/${
              homeColor ? 'home-hover.png' : 'home.png'
            } `}
          />
          <NavMenuTitle>홈</NavMenuTitle>
        </NavMenu>
        <NavMenu>
          <NavMenuImg src="/icons/mobileNav/category.png" />
          <NavMenuTitle>카테고리</NavMenuTitle>
        </NavMenu>
        <NavMenu>
          <NavMenuImg src="/icons/mobileNav/profile.png" />
          <NavMenuTitle>마이페이지</NavMenuTitle>
        </NavMenu>
        <NavMenu>
          <NavMenuImg src="/icons/mobileNav/cart.png" />
          <NavMenuTitle>장바구니</NavMenuTitle>
        </NavMenu>
      </NavMenuContainer>
    </NavContainer>
  );
};

export default Nav;
