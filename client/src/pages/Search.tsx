import styled from 'styled-components';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';
import Add from './Add';

const SearchContainer = styled.div`
  margin-top: 65px;
  margin-bottom: 70px;
`;

const Search = () => {
  return (
    <div>
      <Nav></Nav>
      <SearchContainer> Search 페이지입니다</SearchContainer>
      <Add></Add>
      <MobileNav></MobileNav>
    </div>
  );
};

export default Search;
