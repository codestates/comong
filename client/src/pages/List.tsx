import PostList from '../components/postList/PostList';
import styled from 'styled-components';

import MainCategories from '../components/maincategory/MainCategory';
import { LoginNeedModalForList } from '../components/Modals/LoginNeedModalForList';
import { useState } from 'react';
import { useAppSelector } from '../redux/configStore.hooks';
import type { RootState } from '../redux/configStore';
import CarouselBanner from '../components/CarouselBanner';
import Slick from '../components/banner/Slick';
import Item from '../components/banner/Item';

const ListContainer = styled.div`
  font-family: 'roboto', 'Noto Sans KR';
  width: 100%;
`;

type UserProps = {
  LoginCheck(): void;
};

const List = () => {
  const itemData = useAppSelector((state: RootState) => state);
  const isLogin = itemData.userSlice.isLogin;
  const [isLoginModal, setIsLoginModal] = useState(false);
  const LoginCheck = () => {
    if (!isLogin) setIsLoginModal(!isLoginModal);
  };
  return (
    <ListContainer>
      <Item></Item>
      {isLoginModal ? (
        <LoginNeedModalForList>로그인이 필요합니다</LoginNeedModalForList>
      ) : null}
      {/* <hr /> */}
      <MainCategories></MainCategories>
      <PostList LoginCheck={LoginCheck}></PostList>
    </ListContainer>
  );
};

export default List;
