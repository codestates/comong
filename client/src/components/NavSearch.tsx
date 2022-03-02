import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { useNavigate } from 'react-router-dom';
import { navSearchAsync } from '../redux/modules/navSearchSlice';
import type { RootState } from '../redux/configStore';
import { setReduxKeyword } from '../redux/modules/navSearchSlice';

const NavSearch = () => {
  const listData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const handleSearch = () => {
    let value = keyword;
    value = value.replace(/ /g, '');
    value.trim();
    console.log(value);
    if (value !== '') {
      dispatch(navSearchAsync(value));
      dispatch(setReduxKeyword(value));
      setKeyword('');
      navigate('/search');
    }
  };

  return (
    <NavSearchContainer>
      <NavSearchInput value={keyword} onChange={handleKeyword}></NavSearchInput>
      <NavSearchIcon src="/icons/nav/search.png" onClick={handleSearch} />
    </NavSearchContainer>
  );
};

const NavSearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-radius: 15px;
  height: 2rem;
  width: 23%;
  padding: 2px 10px;
  @media only screen and (max-width: 1200px) {
    width: 30%;
  }
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
`;

const NavSearchInput = styled.input`
  background-color: ${(props) => props.theme.colors.lightGrey};
  height: 90%;
  width: 80%;
  margin-left: 10px;
  font-size: 16px;
  border: none;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
  }
`;

const NavSearchIcon = styled.img`
  cursor: pointer;
  display: block;
  margin-left: auto;
  width: 20px;
  height: 20px;
`;

export default NavSearch;
