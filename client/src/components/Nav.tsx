import styled from 'styled-components';
import NavSearch from './NavSearch';

const NavContainer = styled.div`
  width: 100%;
  height: 65px;
  position: fixed;
  top: 0;
  font-family: roboto;
  border-bottom: 1px solid #e2e2e2;
  background-color: #ffffff;
`;
const NavLinks = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  max-width: 1200px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 35px;
  font-weight: bold;
`;
const SearchBar = styled.div`
  background-color: #e0e0e0;
  border-radius: 15px;
  height: 2rem;
  width: 20rem;
`;
const NavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavMenu = styled.div`
  margin: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const NavNotification = styled.img`
  margin-left: 8px;
  width: 20px;
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
          <NavNotification src="/icons/bell2.png" />
        </NavMenuContainer>
      </NavLinks>
    </NavContainer>
  );
};

export default Nav;
