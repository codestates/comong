import styled from 'styled-components';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import type { RootState } from '../redux/configStore';
import SearchList from '../components/searchList/SearchList';

const SearchContainer = styled.div`
  margin-top: 65px;
  margin-bottom: 70px;
`;

const SearchMention = styled.div`
  display: flex;
  justify-content: center;
  font-size: 33px;
  margin-top: 150px;
  margin-bottom: 60px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  color: ${(props) => props.theme.colors.charcol};
  span {
    color: ${(props) => props.theme.colors.accentColor};
    font-size: 42px;
  }
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    margin-top: 100px;
    margin-bottom: 30px;
    font-size: 14px;
    span {
      font-size: 17px;
    }
  }
`;

const Search = () => {
  const searchData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const keyword = searchData.navSearchSlice.keyword;
  const resultNum = searchData.navSearchSlice.data.length;

  console.log(searchData.navSearchSlice.data);

  return (
    <div>
      <Nav></Nav>
      <SearchContainer>
        <SearchMention>
          <div>
            <span>'{keyword}'&nbsp;</span>에 대한 검색결과는
            <span>&nbsp;{resultNum}건&nbsp;</span>
            입니다
          </div>
        </SearchMention>
        <SearchList></SearchList>
      </SearchContainer>

      <MobileNav></MobileNav>
    </div>
  );
};

export default Search;
