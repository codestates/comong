import styled from 'styled-components';
import PostListItem from './PostListItem';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getListAsync } from '../../redux/modules/listSlice';
import type { RootState } from '../../redux/configStore';

const PostListWrapper = styled.div`
  width: 80%;
  max-width: 1600px;
  padding: 10px;
  display: flex;

  margin: auto;
  margin-top: 20px;
  flex-wrap: wrap;

  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const ItemContainer = styled.div`
  width: 25%;
  @media only screen and (max-width: 1200px) {
    width: 50%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

function PostList() {
  const listData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListAsync());
  }, []);

  return (
    <PostListWrapper>
      {listData.listSlice.data?.map(
        (post: {
          id: number;
          title: string;
          contents: string;
          price: number;
          image_src: string;
        }) => {
          return (
            <ItemContainer>
              <PostListItem key={post.id} post={post} />;
            </ItemContainer>
          );
        },
      )}
    </PostListWrapper>
  );
}

export default PostList;
