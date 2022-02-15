import styled from 'styled-components';
import NavSearch from './NavSearch';

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
const NavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavMenu = styled.div`
  margin: 0.5rem;
  font-size: 14px;
  font-weight: bold;
  @media only screen and (max-width: 1200px) {
    font-size: 13.5px;
    font-weight: bold;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const NavNotification = styled.img`
  margin-left: 30px;
  width: 28px;
`;

const Nav = () => {
  return (
    <NavContainer>
      <NavLinks>
        <Logo>COMONG</Logo>
        <NavSearch />
        <NavMenuContainer>
          <NavMenu>카테고리 </NavMenu>
          <NavMenu>로그인 </NavMenu>
          <NavMenu>장바구니 </NavMenu>
          <NavNotification src="/icons/nav/bell.png" />
        </NavMenuContainer>
      </NavLinks>
    </NavContainer>
  );
};

export default Nav;
