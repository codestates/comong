import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getItemAsync } from '../redux/modules/itemSlice';
import type { RootState } from '../redux/configStore';
import { setData } from '../redux/modules/cartSlice';
import { Viewer } from '@toast-ui/react-editor';
import { getCartPatchAsync } from '../redux/modules/cartSlice';
import { getCartAsync } from '../redux/modules/cartSlice';
import { config } from '../config/config';
import { apiClient } from '../apis';
import CoViewer from '../components/common/CoViewer';
import { PostModal } from '../components/Modals/PostModal';
import { postOrderAsync } from '../redux/modules/cartSlice';
import { postOrderDetailAsync } from '../redux/modules/cartSlice';
import { getUsersAsync } from '../redux/modules/cartSlice';
import { setSubTotalPrice } from '../redux/modules/cartSlice';
import { setSubTotalPriceForOne } from '../redux/modules/cartSlice';
import { setTotalPriceForOne } from '../redux/modules/cartSlice';
import { setDelivery } from '../redux/modules/cartSlice';
import { LoginNeedModal } from '../components/Modals/LoginNeedModal';
import Comments from '../components/Comments/Comments';
import { getCommentAsync } from '../redux/modules/itemSlice';
import CartList from '../components/cart/CartList';

const env = 'development';
const urlConfig = config[env];

const Post = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const postId = Number(pathname.split('/')[2]);
  const [stock, setStock] = useState(1);
  const itemData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [isModal, setIsModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [isDetail, setIsDetail] = useState();
  const isLogin = itemData.userSlice.isLogin;
  const [commentNum, setCommentNum] = useState<number>(0);

  const user_id = itemData.userSlice.userinfo?.id as number;

  let data = itemData.itemSlice.data;
  let id = data.id;
  let category = data.category;
  let seller = data.user_storename;
  let title = data.title;
  let contents = data.contents;
  let price = data.price;
  let img_src = data.image_src.split(',').slice(0, 5);

  useEffect(() => {
    dispatch(getItemAsync(postId));
    dispatch(getCommentAsync(postId));
  }, []);

  const stockHandler = (el: string) => {
    if (el === 'plus' && stock <= 98) setStock(stock + 1);
    if (el === 'minus' && stock >= 2) setStock(stock - 1);
  };

  const addCart = () => {
    if (!isLogin) {
      setIsLoginModal(!isLoginModal);
      return;
    }
    setIsModal(!isModal);

    let tmpObj: {
      user_id: number;
      item_id: number;
      order_amount: number;
      status: string;
      peritem_price: number;
    } = {
      user_id: user_id,
      item_id: id,
      order_amount: stock,
      status: 'pending',
      peritem_price: price,
    };

    let response = apiClient.post(
      `${urlConfig.url}/orders/orderdetail`,
      tmpObj,
    );
  };

  const payHandler = async () => {
    if (!isLogin) {
      setIsLoginModal(!isLoginModal);
      return;
    }
    const data = {
      user_id: user_id,
      item_id: id,
      order_amount: stock,
      peritem_price: price,
      status: 'pending',
    };

    console.log(data);

    const response = await apiClient.post(
      `${urlConfig.url}/orders/orderdetail`,
      data,
    );

    console.log('response', response);
    console.log('response.data.data.id', response.data.data.id);

    const order_id = response.data.data.id;

    const obj2 = {
      total_amount:
        itemData.cartSlice.totalPrice + itemData.cartSlice.totalDelivery,
      status: 'pending',
      user_id: user_id,
      order_detail_id: [order_id],
      shipping_status: 'pending',
      shipping_company: 'cj대한통운',
      shipping_code: '01234567890',
    };

    let itemInfo = {
      title: title,
      image_src: img_src[0],
      order_aomunt: stock,
      price: price,
    };
    let newData = [
      {
        item: {
          order_details: [
            {
              id: order_id,
              item_id: id,
              order_amount: stock,
              peritem_price: price,
              status: 'pending',
              user_id: user_id,
              item: itemInfo,
            },
          ],
          storeInfo: {
            storename: seller,
          },
        },
      },
    ];
    await dispatch(setData(newData));
    await dispatch(postOrderDetailAsync(data));
    await dispatch(setTotalPriceForOne(price * stock));
    await dispatch(setDelivery(3000));
    await dispatch(postOrderAsync(obj2));
    await dispatch(getUsersAsync(user_id));

    navigate('/payment');
  };

  const contentsHandler = (el: string) => {
    if (el === 'description') setIsComments(false);
    else setIsComments(true);
  };

  useEffect(() => {
    apiClient
      .get(`${urlConfig.url}/comments/itemlist?item_id=${id}`)
      .then((res) => {
        if (res.status === 200) console.log(res.data.data);
        setCommentNum(res.data.data.length);
      });
  }, []);

  const hearts = 90;
  const commentsNum = 120;
  const rating = 4.7;

  return (
    <>
      <Container>
        <PostContainer>
          <ImgContainer>
            <MainImgContainer>
              <MainImg src={img_src[imgIdx]} />
            </MainImgContainer>
            <ThumbnailImgContainer>
              {img_src.map((elements, index) => {
                return (
                  <ThumbnailImg
                    src={elements}
                    onClick={() => setImgIdx(index)}
                  />
                );
              })}
            </ThumbnailImgContainer>
          </ImgContainer>
          <BottomContainer>
            <ContentsContainer>
              <ContentsTitleContainer>
                <ContentsTitle
                  onClick={() => {
                    contentsHandler('description');
                  }}
                >
                  상품 설명
                </ContentsTitle>
                <ContentsTitle
                  onClick={() => {
                    contentsHandler('comments');
                  }}
                >
                  상품평 ({commentNum})
                </ContentsTitle>
              </ContentsTitleContainer>
              <Contentsline />
              <ContentsArea>
                {isComments ? (
                  <Comments />
                ) : (
                  <CoViewer editorState={contents} />
                )}
              </ContentsArea>
            </ContentsContainer>
            <OrderContainer>
              <Category>{category}</Category>
              <Title>{title}</Title>
              <HeartsAndCommentsAndRatingContainer>
                <Hearts>♥&nbsp;{hearts}</Hearts>
                <CommentsNum>💬&nbsp;{commentsNum}</CommentsNum>
                <Rating>⭐&nbsp;{rating}</Rating>
              </HeartsAndCommentsAndRatingContainer>
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
              {isModal ? (
                <PostModal>장바구니에 상품이 담겼습니다</PostModal>
              ) : null}
              {isLoginModal ? (
                <LoginNeedModal>로그인이 필요합니다</LoginNeedModal>
              ) : null}
              <ButtonContainer>
                <CartButton
                  onClick={() => {
                    addCart();
                  }}
                >
                  장바구니
                </CartButton>
                <OrderButton onClick={payHandler}>상품구매</OrderButton>
              </ButtonContainer>
            </OrderContainer>
          </BottomContainer>
        </PostContainer>
      </Container>
    </>
  );
};

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
  width: 100%;
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

  width: 700px;
  height: 500px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 400px;
    width: 100%;
  }
`;
const MainImgContainer = styled.div`
  width: 500px;
  height: 500px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    height: 330px;
    width: 100%;
  }
`;
const MainImg = styled.img`
  width: 500px;
  height: 500px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    height: 330px;
    width: 100%;
  }
`;

const ThumbnailImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;

  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    margin-left: 0px;
    width: 100%;
  }
`;
const ThumbnailImg = styled.img`
  width: 95px;
  height: 95px;
  margin-top: 4.5px;
  margin-left: 4.5px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    margin-top: 4.5px;
    margin-left: 0px;
    margin-right: 4px;
    width: 20%;
    height: 70px;
  }
`;

const BottomContainer = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  margin-top: 30px;
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
    /* margin-bottom: 300px; */
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
  height: 500px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  box-shadow: 0px 0px 9px #eeeeee;
  border-radius: 5px;
  @media only screen and (max-width: 1200px) {
    bottom: 0px;
    width: 100%;
    height: 200px;
  }
  @media only screen and (max-width: 768px) {
  }
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
  height: 52px;
  line-height: 27px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const HeartsAndCommentsAndRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'roboto', 'Noto Sans KR';
  font-size: 12px;
  color: gray;
  font-weight: 500;
  margin-bottom: 10px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const Hearts = styled.div`
  font-size: 15px;
  color: transparent; /* 기존 이모지 컬러 제거 */
  /* text-shadow: 0 0 0 ${(props) => props.theme.colors.pink}; */
  text-shadow: 0 0 0 ${(props) => props.theme.colors.purple};
`;
const CommentsNum = styled.div`
  margin-left: 12px;
  font-size: 15px;
`;
const Rating = styled.div`
  margin-left: 10px;
  font-size: 15px;
  color: transparent; /* 기존 이모지 컬러 제거 */
  text-shadow: 0 0 0 ${(props) => props.theme.colors.accentColor}; /* 새 이모지 색상 부여 */
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

export default Post;
