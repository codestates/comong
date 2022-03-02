import styled from 'styled-components';
import PostListItem from './PostListItem';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getListAsync } from '../../redux/modules/listSlice';
import type { RootState } from '../../redux/configStore';

import { config } from '../../config/config';
import { apiClient } from '../../apis';

const env = 'development';
const urlConfig = config[env];

interface Post {
  contents: string;
  createdAt: string;
  id: number;
  image_src: string;
  item_has_categories: [];
  price: number;
  title: string;
  updatedAT: string;
  user: { storename: string };
  user_id: number;
}

const PostListWrapper = styled.div`
  width: 80%;
  max-width: 1400px;
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
  margin-bottom: 10px;
  @media only screen and (max-width: 1200px) {
    width: 50%;
  }
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;

function PostList() {
  const listData = useAppSelector((state: RootState) => state);

  const [infoArray, setInfoArray] = React.useState<any[]>([]);

  const dispatch = useAppDispatch();

  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    getInfo();
  }, []);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [infoArray]);

  const getInfo = async () => {
    // console.log('infoArray.length', infoArray.length);
    // console.log(
    //   'infoArray[infoArray.length].id',
    //   infoArray[infoArray.length - 1].id,
    // );

    const apiId = infoArray.length > 0 ? infoArray[infoArray.length - 1].id : 0;

    const res = await apiClient.get(`items?number=20&startindex=${apiId}`, {}); // 서버에서 데이터 가져오기
    console.log('res.data', res.data);
    setInfoArray((infoArray) => [...infoArray, ...res.data]); // state에 추가

    console.log(infoArray);
    console.log('info data add...');
  };

  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        getInfo();
        // dispatch(getListAsync());
      }
    });
  };

  console.log('infoArray', infoArray);
  return (
    <PostListWrapper>
      {infoArray?.map((post: Post, index) => {
        console.log('infoArray.length', infoArray.length, 'index', index);
        if (infoArray.length - 5 === index) {
          return (
            <ItemContainer key={post.id + post.title} ref={boxRef}>
              <PostListItem key={post.id} post={post} />
            </ItemContainer>
          );
        } else {
          return (
            <ItemContainer key={post.id + post.title}>
              <PostListItem key={post.id} post={post} />
            </ItemContainer>
          );
        }
      })}
    </PostListWrapper>
  );
}

export default PostList;
