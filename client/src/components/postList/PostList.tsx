import styled from 'styled-components';
import PostListItem from './PostListItem';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/configStore.hooks';
import { getListAsync } from '../../store/listSlice';
import type { RootState } from '../../store/configStore';

const PostListWrapper = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

function PostList() {
  const listData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListAsync());
  }, []);

  console.log(listData.listSlice.data);

  return (
    <PostListWrapper>
      포스트 리스트
      {listData.listSlice.data?.map(
        (post: {
          id: number;
          title: string;
          contents: string;
          price: number;
          image_src: string;
        }) => {
          console.log(post);
          return <PostListItem key={post.id} post={post} />;
        },
      )}
    </PostListWrapper>
  );
}

export default PostList;
