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
`;
const NavMenuImg = styled.img`
  margin: auto;
  color: #323232;
  height: 35px;
`;
const NavMenuTitle = styled.p`
  text-align: center;
  margin-top: 8px;
  color: #323232;
  font-size: 12px;
  font-weight: bold;
`;

const Nav = () => {
  return (
    <NavContainer>
      <NavMenuContainer>
        <NavMenu>
          <NavMenuImg src="/icons/mobileNav/home.png" />
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
