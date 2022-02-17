import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getItemAsync } from '../redux/modules/itemSlice';
import type { RootState } from '../redux/configStore';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: red;
  /* justify-content: center;
  align-items: center; */
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const MainImgContainer = styled.div`
  width: 50%;
`;
const MainImg = styled.img`
  width: 90%;
`;

const ThumbnailImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ThumbnailImg = styled.img`
  width: 10%;
`;

const OrderContainer = styled.div`
  width: 100%;
`;
const Category = styled.div``;
const Seller = styled.div``;
const Titile = styled.div``;
const Price = styled.div``;
const CartButton = styled.button``;
const OrderButton = styled.button``;

const Post = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const postId = Number(pathname.split('/')[2]);

  const itemData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getItemAsync());
  }, []);

  // let data = itemData.listSlice.data[0];
  let id = 1;
  let category = '카테1/카테2';
  let seller = '판매자';
  let title = '제목입니다';
  let content = '콘텐츠입니다';
  let price = 30000;
  let img_src =
    'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';

  return (
    <>
      <Nav></Nav>
      <PostContainer>
        <ImgContainer>
          <MainImgContainer>
            <MainImg src={img_src} />
          </MainImgContainer>
          <ThumbnailImgContainer>
            <ThumbnailImg src={img_src} />
            <ThumbnailImg src={img_src} />
            <ThumbnailImg src={img_src} />
            <ThumbnailImg src={img_src} />
          </ThumbnailImgContainer>
        </ImgContainer>
        <OrderContainer>
          <Category>{category}</Category>
          <Seller>{seller}</Seller>
          <Titile>{title}</Titile>
          <Price>{price}</Price>
          <CartButton>장바구니 넣기</CartButton>
          <OrderButton>상품 구매하기</OrderButton>
        </OrderContainer>
      </PostContainer>
      <MobileNav></MobileNav>
    </>
  );
};

export default Post;
