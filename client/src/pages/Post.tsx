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

const Container = styled.div`
  display: flex;
  margin-top: 65px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Noto Sans KR;
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const MainImgContainer = styled.div`
  width: 50%;
  height: 50%;
`;
const MainImg = styled.img`
  width: 90%;
`;

const ThumbnailImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 10%;
`;
const ThumbnailImg = styled.img`
  margin: 10px;
  width: 100%;
`;

const BottomContainer = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentsContainer = styled.div`
  width: 60%;

  background-color: #fff;
  height: 2000px;
`;
const Contentsline = styled.hr`
  margin-top: 20px;
  /* size: 2px; */
  width: 90%;

  color: black;
  background-color: black;
`;

const ContentsTitleContainer = styled.div`
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 15px;
  display: flex;
`;
const ContentsTitle = styled.span`
  margin: 20px;
  margin-bottom: 0px;
  font-size: 18px;
  font-weight: 600;
`;
const ContentsArea = styled.div`
  background-color: white;
  height: 2000px;
`;

const OrderContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 30%;
  position: sticky;
  height: 450px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* align-items: center; */
  justify-content: center;
  box-shadow: 0px 0px 12px #eeeeee;
`;
const Category = styled.div`
  color: gray;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Titile = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #2f2f2f;
  font-weight: 600;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  /* white-space: nowrap; */
  height: 42px;
`;

const Seller = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #2f2f2f;
  font-weight: 500;
`;
const Price = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  color: #2f2f2f;
  font-weight: 700;
  font-size: 27px;
`;
const StockController = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const StockAddButton = styled.button`
  border: 2px solid grey;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
`;
const StockAddIcon = styled.img`
  width: 15px;
`;
const StockDisplay = styled.div`
  width: 30px;
  text-align: center;
  font-size: 20px;
  color: #4d4d4d;
  /* color: red; */
  margin: auto;
  margin-left: 5px;
  margin-right: 5px;
`;
const StockMinusButton = styled.button`
  border: 2px solid grey;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
`;
const StockMinusIcon = styled.img`
  width: 15px;
`;

const StockSelector = styled.div`
  width: 40px;
`;

const CartButton = styled.button`
  margin-top: 20px;
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 20px;
  width: 100%;
  height: 60px;
  color: white;
  /* background-color: ${(props) => props.theme.colors.accentColorLight}; */
  background-color: #84ccff;
  border-radius: 5px;
  text-align: center;
  display: block;
`;
const OrderButton = styled.button`
  margin-top: 10px;
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 20px;
  height: 60px;
  color: white;
  background-color: ${(props) => props.theme.colors.accentColor};
  border-radius: 5px;
  width: 100%;
`;

const Post = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const postId = Number(pathname.split('/')[2]);

  const [stock, setStock] = useState(1);

  const itemData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getItemAsync());
  }, []);

  // let data = itemData.listSlice.data[0];
  let id = 1;
  let category = '카테고리1/카테고리2';
  let seller = '판매자명';
  let title =
    '[🏆TOP 50] 왕초보도 할 수 있는 미국주식 투자, 배당금으로 제2의 월급 만들기';
  let content = '콘텐츠입니다';
  let price = (30000).toLocaleString('en');
  let img_src = 'http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904';

  const stockHandler = (el: string) => {
    if (el === 'plus' && stock <= 98) setStock(stock + 1);
    if (el === 'minus' && stock >= 2) setStock(stock - 1);
  };

  return (
    <Container>
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
        <BottomContainer>
          <ContentsContainer>
            <ContentsTitleContainer>
              <ContentsTitle>상품 설명</ContentsTitle>
              <ContentsTitle>상품평</ContentsTitle>
            </ContentsTitleContainer>
            {/* <Contentsline /> */}
            <hr color="black" />
            <ContentsArea></ContentsArea>
          </ContentsContainer>
          <OrderContainer>
            <Category>{category}</Category>
            <Titile>{title}</Titile>
            <Seller>{seller}</Seller>
            <Price>{price}원</Price>
            <StockController>
              <StockMinusButton
                onClick={() => {
                  stockHandler('minus');
                }}
              >
                <StockMinusIcon src="/icons/post/minus.png" />
              </StockMinusButton>
              <StockDisplay>{stock}</StockDisplay>
              <StockAddButton
                onClick={() => {
                  stockHandler('plus');
                }}
              >
                <StockAddIcon src="/icons/post/plus.png" />
              </StockAddButton>
            </StockController>
            <CartButton>장바구니 넣기</CartButton>
            <OrderButton>상품 구매하기</OrderButton>
          </OrderContainer>
        </BottomContainer>
      </PostContainer>
    </Container>
  );
};

export default Post;
