import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configStore.hooks';
import { getListAsync } from '../store/listSlice';
import type { RootState } from '../store/configStore';
import PostList from '../components/postList/PostList';

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
