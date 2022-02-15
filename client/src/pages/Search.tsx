import styled from 'styled-components';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';

const SearchContainer = styled.div`
  margin-top: 65px;
  margin-bottom: 70px;
`;

const Search = () => {
  return (
    <div>
      <Nav></Nav>
      <SearchContainer> Search 페이지입니다</SearchContainer>
      <MobileNav></MobileNav>
    </div>
  );
};

export default Search;
