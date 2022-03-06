import styled from 'styled-components';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';
import SearchList from '../components/searchList/SearchList';
import { useNavigate } from 'react-router-dom';
import { navSearchAsync } from '../redux/modules/navSearchSlice';
import type { RootState } from '../redux/configStore';
import { setReduxKeyword } from '../redux/modules/navSearchSlice';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getListAsync } from '../redux/modules/listSlice';
import { LoginNeedModalForList } from '../components/Modals/LoginNeedModalForList';
import { config } from '../config/config';
import { apiClient } from '../apis';
import { useEffect, useState } from 'react';
import List from './List';

const env = 'development';
const urlConfig = config[env];

const Search = () => {
  const navigate = useNavigate();
  const searchData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const keyword = searchData.navSearchSlice.keyword;
  const resultNum = searchData.navSearchSlice.data.length;
  const isSearch = 1;
  const isLogin = searchData.userSlice.isLogin;
  const [isLoginModal, setIsLoginModal] = useState(false);
  const searchResult = searchData.navSearchSlice.data;
  const [list, setList] = useState(['가방', '신발', '소고기', '핸드폰']);

  // let arr = ['가방', '신발', '소고기', '핸드폰'];
  let arr: string[] = [];
  useEffect(() => {
    getHotKeywords();
  }, []);

  const getHotKeywords = async () => {
    const res = await apiClient.get(`/items/keyword`, {}); // 서버에서 데이터 가져오기
    for (let x of res.data.data) {
      arr.push(x.keyword);
    }
    setList(arr.slice(0, 4));
  };

  const handleSearch = (e: any) => {
    let value = e.target.innerHTML;
    value = value.replace(/ /g, '');
    value.trim();
    if (value !== '') {
      dispatch(navSearchAsync(value));
      dispatch(setReduxKeyword(value));
      navigate('/search');
    }
  };

  const LoginCheck = () => {
    if (!isLogin) setIsLoginModal(!isLoginModal);
  };

  return (
    <div>
      <Nav></Nav>
      <SearchContainer>
        {isLoginModal ? (
          <LoginNeedModalForList>로그인이 필요합니다</LoginNeedModalForList>
        ) : null}
        <HotContainer>
          <HotTitle>
            인기검색어&nbsp;&nbsp;&nbsp;<HotLine></HotLine>
          </HotTitle>
          <KeyWordsContainer>
            {list.map((el) => {
              return <Hotkeywords onClick={handleSearch}>{el}</Hotkeywords>;
            })}
          </KeyWordsContainer>
        </HotContainer>
        <SearchMention>
          <div>
            <span>'{keyword}'&nbsp;</span>에 대한 검색결과는
            <span>&nbsp;{resultNum}건&nbsp;</span>
            입니다
          </div>
        </SearchMention>
        {/* <List isSearch={isSearch}></List> */}
        <SearchList
          LoginCheck={LoginCheck}
          searchResult={searchResult}
        ></SearchList>
      </SearchContainer>

      <MobileNav></MobileNav>
    </div>
  );
};

const SearchContainer = styled.div`
  margin-top: 65px;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchMention = styled.div`
  display: flex;
  justify-content: center;
  font-size: 33px;
  margin-top: 40px;
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
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 14px;
    span {
      font-size: 17px;
    }
  }
`;
const HotContainer = styled.div`
  display: flex;
  margin: 20px;
  align-items: center;
  justify-content: center;
  font-family: Noto Sans KR;
  border: 3px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 20px;
  padding: 5px 20px;
  max-width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  color: ${(props) => props.theme.colors.charcol};
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    min-width: 330px;
  }
`;

const HotLine = styled.span`
  margin: 0px 5px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const HotTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 15px;
    margin-top: 10px;
  }
`;
const KeyWordsContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 768px) {
  }
`;
const Hotkeywords = styled.div`
  font-size: 17px;
  margin: 10px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: break-word;
  height: 20px;
  @media only screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 15px;
    margin-top: 15px;
  }
`;

export default Search;
