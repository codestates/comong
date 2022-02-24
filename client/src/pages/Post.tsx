import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getItemAsync } from '../redux/modules/itemSlice';
import type { RootState } from '../redux/configStore';

import { Viewer } from '@toast-ui/react-editor';
import { getCartPatchAsync } from '../redux/modules/cartSlice';
import { config } from '../config/config';
import { apiClient } from '../apis';
import CoViewer from '../components/common/CoViewer';

const env = 'development';
const urlConfig = config[env];

const Container = styled.div`
  display: flex;
  margin-top: 65px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Noto Sans KR;
  @media only screen and (max-width: 768px) {
    /* margin-bottom: 70px; */
  }
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
  margin: 40px 0px;
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
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const ContentsContainer = styled.div`
  width: 60%;
  background-color: white;
  @media only screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 300px;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const Contentsline = styled.hr`
  margin-top: 20px;
  size: 5;
  width: 95%;
  color: black;
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
  margin: 20px 30px;
`;

const OrderContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 30%;
  position: sticky;
  height: 450px;
  top: 65px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  box-shadow: 0px 0px 12px #eeeeee;
  z-index: 12;
  @media only screen and (max-width: 1200px) {
    bottom: 0px;
    width: 100%;
    height: 300px;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const OrderContainerMobile = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 30%;
  position: sticky;
  height: 450px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  box-shadow: 0px 0px 12px ${(props) => props.theme.colors.whiteForShadow};
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
const Category = styled.div`
  color: gray;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 10px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const Title = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.charcol};
  font-weight: 600;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  height: 60px;
  line-height: 27px;
`;

const Seller = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.charcol};
  font-weight: 500;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const Price = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.charcol};
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
  background-color: white;
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
  margin: auto;
  margin-left: 5px;
  margin-right: 5px;
`;
const StockMinusButton = styled.button`
  border: 2px solid grey;
  border-radius: 50%;
  background-color: white;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex-direction: row;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const CartButton = styled.button`
  margin: 10px 2px;
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 20px;
  width: 100%;
  height: 60px;
  color: white;
  background-color: ${(props) => props.theme.colors.accentColorMiddle};
  border-radius: 5px;
  text-align: center;
  display: block;

  @media only screen and (max-width: 1200px) {
    width: 50%;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const OrderButton = styled.button`
  margin: 10px;
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 20px;
  height: 60px;
  color: white;
  background-color: ${(props) => props.theme.colors.accentColor};
  border-radius: 5px;
  width: 100%;
  @media only screen and (max-width: 1200px) {
    width: 50%;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const Post = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const postId = Number(pathname.split('/')[2]);
  const [stock, setStock] = useState(1);
  const itemData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const data2 = itemData.itemSlice.data;

  const[imgIdx, setImgIdx] = useState(0)

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(getItemAsync(postId));
  }, []);

  let data = itemData.itemSlice.data;
  let id = data.id;
  let category = data.category;
  let seller = data.user_storename;
  let title = data.title;
  let contents = data.contents;
  let price = data.price;
  let img_src = data.image_src.split(',');
  console.log(itemData.itemSlice.data);
  console.log('contents', contents);

  const stockHandler = (el: string) => {
    if (el === 'plus' && stock <= 98) setStock(stock + 1);
    if (el === 'minus' && stock >= 2) setStock(stock - 1);
  };

  const addCart = () => {
    const user_id = itemData.userSlice.userinfo?.id as number;
    let tmpObj: {
      user_id: number;
      item_id: number;
      order_amount: number;
      status: string;
      peritem_price: number;
    } = {
      user_id: user_id,
      item_id: id,
      order_amount: 1,
      status: 'pending',
      peritem_price: price,
    };
    console.log(tmpObj);

    let response = apiClient.post(
      `${urlConfig.url}/orders/orderdetail`,
      tmpObj,
    );
    console.log(response);
  };

  return (
    <Container>
      <PostContainer>
        <ImgContainer>
          <MainImgContainer>
            <MainImg src={img_src[imgIdx]} />
          </MainImgContainer>
          <ThumbnailImgContainer>
            {img_src.map((elements, index) => {
              return <ThumbnailImg src={elements} onClick={() => setImgIdx(index)} />;
            })}
            {/*
            <ThumbnailImg src={img_src} />
            <ThumbnailImg src={img_src} />
            <ThumbnailImg src={img_src} />
            <ThumbnailImg src={img_src} />
            */}
          </ThumbnailImgContainer>
        </ImgContainer>
        <BottomContainer>
          <ContentsContainer>
            <ContentsTitleContainer>
              <ContentsTitle>상품 설명</ContentsTitle>
              <ContentsTitle>상품평</ContentsTitle>
            </ContentsTitleContainer>
            <Contentsline />
            <ContentsArea>
              <CoViewer editorState={contents} />
            </ContentsArea>
          </ContentsContainer>
          <OrderContainer>
            <Category>{category}</Category>
            <Title>{title}</Title>
            <Seller>{seller}</Seller>
            <Price>{(price * stock).toLocaleString('en')}원</Price>
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
            <ButtonContainer>
              <CartButton onClick={addCart}>장바구니</CartButton>
              <OrderButton>상품구매</OrderButton>
            </ButtonContainer>
          </OrderContainer>
        </BottomContainer>
      </PostContainer>
    </Container>
  );
};

export default Post;
