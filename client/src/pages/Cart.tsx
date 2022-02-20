import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getCartAsync } from '../redux/modules/cartSlice';
import CartList from '../components/cart/CartList';
import type { RootState } from '../redux/configStore';

const Container = styled.div`
  display: flex;
  /* background-color: yellow; */
  margin-top: 65px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Noto Sans KR;
  @media only screen and (max-width: 768px) {
    margin-bottom: 70px;
  }
`;
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
  /* max-width: 1200px; */
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CartTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-top: 50px;
  color: #3f3f3f;
  width: 100%;
  max-width: 1200px;
`;

const CartLine = styled.hr`
  margin-top: 20px;
  margin-bottom: 10px;
  size: 10px;
  width: 100%;

  /* color: red; */
  /* background-color: red; */
`;

const ContentsBackground = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
`;

const ContentsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  width: 80%;
  max-width: 1200px;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const CartListContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  /* margin: auto; */
  width: 65%;
  position: sticky;
  margin-right: 20px;
  /* height: 2000px; */
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  box-shadow: 0px 0px 12px #cfcfcf;
  border-radius: 5px;
`;

const OrderContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 30%;
  position: sticky;
  height: 400px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  box-shadow: 0px 0px 12px #cfcfcf;
  border-radius: 5px;
`;
const OrderTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;
const OrderLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 0px;
  width: 100%;
`;

const OrderTextContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
`;
const OrderText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0px;
`;
const OrderTextTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: gray;
`;
const OrderTextContents = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #535353;
`;

const OrderTotalPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;
`;

const OrderTotalPriceTtile = styled.div`
  font-weight: 400;
`;
const OrderTotalPriceContents = styled.div`
  font-size: 27px;
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

const Cart = () => {
  const cartData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  // console.log('cartData.cartSlice', cartData.cartSlice.data[0]);

  // let data = cartData.cartSlice.data[0];
  // console.log('data', data);
  // for (let x in data) {
  //   console.log(x, data[x]);
  // }

  let name = '12%+15%중복할인 알로앤루알퐁소 베이비페어 빅세일';

  let total_stock = 1;
  let total_delivery = (9000).toLocaleString('en');
  let total_price = (11200).toLocaleString('en');
  let img_src = 'http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904';

  return (
    <Container>
      <CartContainer>
        <TitleContainer>
          <CartTitle>장바구니</CartTitle>
          <CartLine></CartLine>
        </TitleContainer>
        <ContentsBackground>
          <ContentsContainer>
            <CartListContainer>
              <CartList></CartList>
            </CartListContainer>
            <OrderContainer>
              <OrderTitle>전체 합계</OrderTitle>
              <OrderLine />
              <OrderTextContainer>
                <OrderText>
                  <OrderTextTitle>상품금액</OrderTextTitle>
                  <OrderTextContents>30,000원</OrderTextContents>
                </OrderText>
                <OrderText>
                  <OrderTextTitle>배송비</OrderTextTitle>
                  <OrderTextContents>3,000원</OrderTextContents>
                </OrderText>
              </OrderTextContainer>
              <OrderLine />
              <OrderTotalPrice>
                <OrderTotalPriceTtile>전체금액</OrderTotalPriceTtile>
                <OrderTotalPriceContents>43,200원</OrderTotalPriceContents>
              </OrderTotalPrice>
              <OrderButton>상품 구매하기</OrderButton>
            </OrderContainer>
          </ContentsContainer>
        </ContentsBackground>
      </CartContainer>
    </Container>
  );
};

export default Cart;
