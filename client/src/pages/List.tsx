import PostList from '../components/postList/PostList';
import styled from 'styled-components';

import MainCategories from '../components/maincategory/MainCategory';
import { LoginNeedModalForList } from '../components/Modals/LoginNeedModalForList';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import type { RootState } from '../redux/configStore';
import CarouselBanner from '../components/CarouselBanner';
import Slick from '../components/banner/Slick';
import Item from '../components/banner/Item';
import { setLoading } from '../redux/modules/loadingSlice';

const ListContainer = styled.div`
  font-family: 'roboto', 'Noto Sans KR';
  width: 100%;
`;

type UserProps = {
  isSearch?: number;
};

const List = ({ isSearch }: UserProps) => {
  const [isModal, setIsModal] = useState(false);

  const dispatch = useAppDispatch();
  dispatch(setLoading(false));
  const itemData = useAppSelector((state: RootState) => state);
  const isLogin = itemData.userSlice.isLogin;
  const LoginCheck = () => {
    if (!isLogin) setIsModal(!isModal);
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };
  console.log('isModal', isModal);

  return (
    <ListContainer>
      {isSearch ? null : <Item></Item>}
      {isModal ? (
        <LoginNeedModalForList
          modalHandler={modalHandler}
          isModal={isModal}
        ></LoginNeedModalForList>
      ) : null}
      {isSearch ? null : <MainCategories></MainCategories>}
      <PostList LoginCheck={LoginCheck}></PostList>
    </ListContainer>
  );
};

export default List;
