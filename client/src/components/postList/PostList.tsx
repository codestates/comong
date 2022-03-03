import styled from 'styled-components';
import PostListItem from './PostListItem';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getListAsync } from '../../redux/modules/listSlice';
import type { RootState } from '../../redux/configStore';
import { v4 as uuidv4 } from 'uuid';

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
    width: 80%;
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

type UserProps = {
  LoginCheck(): void;
};

function PostList({ LoginCheck }: UserProps) {
  const listData = useAppSelector((state: RootState) => state);

  const [infoArray, setInfoArray] = React.useState<any[]>([]);
  const [curCat, setCurCat] = useState(0);

  const dispatch = useAppDispatch();

  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);
  const category = listData.itemSlice.category;

  useEffect(() => {
    getInfo();
  }, [category]);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [infoArray]);

  const getInfo = async () => {
    const apiId = infoArray.length > 0 ? infoArray[infoArray.length - 1].id : 0;
    let res: { data: [] };

    console.log('apiId', apiId, 'curCat', curCat, 'category', category);
    // if (category === 0) {
    //   if (curCat !== category) setInfoArray([]);
    //   res = await apiClient.get(`items?number=20`, {}); // 서버에서 데이터 가져오기
    // } else {
    if (curCat !== category) {
      setInfoArray([]);
      setCurCat(category);
      res = await apiClient.get(`items?number=20&category=${category}`, {}); // 서버에서 데이터 가져오기
    } else {
      setCurCat(category);
      res = await apiClient.get(
        `items?number=20&startindex=${apiId}&category=${category}`,
        {},
      ); // 서버에서 데이터 가져오기
    }
    // }
    console.log('res', res);
    console.log('res.data', res.data);
    setInfoArray((infoArray) => [...infoArray, ...res.data]); // state에 추가
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
        // console.log('infoArray.length', infoArray.length, 'index', index);
        if (infoArray.length - 5 === index) {
          return (
            <ItemContainer key={uuidv4()} ref={boxRef}>
              <PostListItem
                key={uuidv4()}
                post={post}
                LoginCheck={LoginCheck}
              />
            </ItemContainer>
          );
        } else {
          return (
            <ItemContainer key={uuidv4()}>
              <PostListItem
                key={uuidv4()}
                post={post}
                LoginCheck={LoginCheck}
              />
            </ItemContainer>
          );
        }
      })}
    </PostListWrapper>
  );
}

export default PostList;
