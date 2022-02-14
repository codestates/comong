import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getListAsync } from '../redux/modules/listSlice';
import type { RootState } from '../redux/configStore';
import PostList from '../components/postList/PostList';
import { getItems } from '../apis/api/items';

const List = () => {
  const listData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  return (
    <>
      <PostList></PostList>
    </>
  );
};

export default List;
