import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configStore.hooks';
import BasicProfile from './BasicProfile';
import NavSeller from './NavSeller';
import NavUser from './NavUser';

const Wrapper = styled.div`
  height: 100vh;
  width: 200px;
  position: fixed;
  top: 65px;
  left: 10px;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
`;

function MypageAsideBar() {
  const { role } = useAppSelector((state) => state.userSlice);
  return (
    <Wrapper>
      <BasicProfile></BasicProfile>
      {role === 0 ? <NavUser></NavUser> : <NavSeller></NavSeller>}
    </Wrapper>
  );
}

export default MypageAsideBar;
