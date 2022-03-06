import styled from 'styled-components';
import SearchListItem from './SearchListItem';
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
  max-width: 1200px;
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
  searchResult?: any[];
};

function SearchList({ LoginCheck, searchResult }: UserProps) {
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

    if (curCat !== category) {
      setInfoArray([]);
      setCurCat(category);
      res = await apiClient.get(`items?number=20&category=${category}`, {}); // 서버에서 데이터 가져오기
    } else {
      setCurCat(category);
      res = await apiClient.get(
        `items?number=20&startindex=${apiId}&category=${category}`,
        {},
      );
    }

    setInfoArray((infoArray) => [...infoArray, ...res.data]);
  };

  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        getInfo();
      }
    });
  };

  return (
    <PostListWrapper>
      {searchResult?.map((post: Post, index) => {
        return (
          <ItemContainer key={uuidv4()}>
            <SearchListItem
              key={uuidv4()}
              post={post}
              LoginCheck={LoginCheck}
            />
          </ItemContainer>
        );
      })}
    </PostListWrapper>
  );
}

export default SearchList;
