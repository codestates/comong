import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getCartAsync } from '../redux/modules/cartSlice';
import CartList from '../components/cart/CartList';
import type { RootState } from '../redux/configStore';
import { setTotalPrice } from '../redux/modules/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getCartPatchAsync } from '../redux/modules/cartSlice';
const Container = styled.div`
  display: flex;
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
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const CartTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-top: 50px;
  color: #3f3f3f;
  width: 100%;
  max-width: 1200px;
`;

const ContentsBackground = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.greyForBackGround};
`;

const ContentsContainer = styled.div`
  display: flex;
  margin-top: 30px;
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
  width: 65%;
  position: sticky;
  margin-right: 20px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  box-shadow: 0px 0px 12px ${(props) => props.theme.colors.whiteForShadow};
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
  box-shadow: 0px 0px 12px ${(props) => props.theme.colors.whiteForShadow};
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartAsync());
    dispatch(setTotalPrice(cartData.cartSlice.subTotalPrice));
  }, []);

  let sum = 0;
  let delivery = 0;
  for (let x in cartData.cartSlice.subTotalPrice) {
    sum += Number(cartData.cartSlice.subTotalPrice[x]);
    delivery += 3000;
  }

  const payHandler = async () => {
    let obj = cartData.cartSlice.data[0];
    let tmp: [{ user_id: number }] = [{ user_id: 1 }];
    for (let el in obj) {
      console.log(obj[el].order_details);
      for (let x of obj[el].order_details) {
        let tmpObj: {
          id: string;
          item_id: number;
          order_amount: number;
          status: string;
          user_id: number;
          peritem_price: number;
        } = {
          id: '1',
          item_id: 1,
          order_amount: 2,
          status: '1',
          user_id: 3,
          peritem_price: 1,
        };
        tmpObj.id = x.id;
        tmpObj.user_id = x.user_id;
        tmpObj.item_id = x.item_id;
        tmpObj.order_amount = x.order_amount;
        tmpObj.peritem_price = x.peritem_price;
        tmpObj.status = x.status;
        tmp.push(tmpObj);
      }
    }

    tmp.splice(0, 1);

    try {
      const response = await dispatch(getCartPatchAsync(tmp)).unwrap();
      navigate('/payment');
    } catch (error) {
      navigate('/');
      console.log(error);
    }

    // console.log(tmp);

    return;
  };

  return (
    <Container>
      <CartContainer>
        <TitleContainer>
          <CartTitle>장바구니</CartTitle>
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
                  <OrderTextTitle>총 상품금액</OrderTextTitle>
                  <OrderTextContents>
                    {sum.toLocaleString('en')}원
                  </OrderTextContents>
                </OrderText>
                <OrderText>
                  <OrderTextTitle>총 배송비</OrderTextTitle>
                  <OrderTextContents>
                    {delivery.toLocaleString('en')}원
                  </OrderTextContents>
                </OrderText>
              </OrderTextContainer>
              <OrderLine />
              <OrderTotalPrice>
                <OrderTotalPriceTtile>전체금액</OrderTotalPriceTtile>
                <OrderTotalPriceContents>
                  {(sum + delivery).toLocaleString('en')}원
                </OrderTotalPriceContents>
              </OrderTotalPrice>
              <OrderButton onClick={payHandler}>상품 구매하기</OrderButton>
            </OrderContainer>
          </ContentsContainer>
        </ContentsBackground>
      </CartContainer>
    </Container>
  );
};

export default Cart;
