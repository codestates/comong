import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getCartAsync } from '../redux/modules/cartSlice';
import CartList from '../components/cart/CartList';
import type { RootState } from '../redux/configStore';
import { setTotalPrice } from '../redux/modules/cartSlice';
import { setDelivery } from '../redux/modules/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getCartPatchAsync } from '../redux/modules/cartSlice';
import { postOrderAsync } from '../redux/modules/cartSlice';
import { config } from '../config/config';
import { apiClient } from '../apis';
import { getUsersAsync } from '../redux/modules/cartSlice';
import { CartModal } from '../components/Modals/CartModal';

const env = 'development';
const urlConfig = config[env];

const Cart = () => {
  const cartData = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isModal, setIsModal] = useState(false);

  const isLogin = cartData.userSlice.isLogin;
  const userInfo = cartData.userSlice.userinfo;
  const id = userInfo?.id;
  console.log(id);

  let sum = 0;
  let delivery = 0;
  for (let x in cartData.cartSlice.subTotalPrice) {
    console.log(cartData.cartSlice.subTotalPrice);
    sum += Number(cartData.cartSlice.subTotalPrice[x]);
    if (Number(cartData.cartSlice.subTotalPrice[x]) > 0) delivery += 3000;
  }

  useEffect(() => {
    updateCartData();
  }, [delivery]);

  const updateCartData = () => {
    dispatch(getCartAsync(id));
    dispatch(setTotalPrice(cartData.cartSlice.subTotalPrice));
    dispatch(setDelivery(delivery));
  };

  const payHandler = async () => {
    if (!isLogin) navigate('/login');
    let obj = cartData.cartSlice.data[0];
    console.log('pay-handler-obj', obj);
    if (JSON.stringify(obj) === '{}') {
      setIsModal(!isModal);
      return;
    }
    let tmp: [{ user_id: number; id?: number }] = [{ user_id: 1 }];
    for (let el in obj) {
      for (let x of obj[el].order_details) {
        let tmpObj: {
          id: number;
          item_id: number;
          order_amount: number;
          status: string;
          user_id: number;
          peritem_price: number;
        } = {
          id: 1,
          item_id: 1,
          order_amount: 2,
          status: '1',
          user_id: 3,
          peritem_price: 1,
        };
        console.log(x.user_id);
        tmpObj.id = Number(x.id);
        tmpObj.user_id = x.user_id;
        tmpObj.item_id = x.item_id;
        tmpObj.order_amount = x.order_amount;
        tmpObj.peritem_price = x.peritem_price;
        tmpObj.status = x.status;
        tmp.push(tmpObj);
      }
    }

    tmp.splice(0, 1);

    let arr = tmp.map((el) => el.id);
    let obj2 = {
      total_amount:
        cartData.cartSlice.totalPrice + cartData.cartSlice.totalDelivery,
      status: 'pending',
      user_id: cartData.userSlice.userinfo?.id,
      order_detail_id: arr,
      shipping_status: 'pending',
      shipping_company: 'cj대한통운',
      shipping_code: '01234567890',
    };
    console.log('obj2', obj2);
    await dispatch(getCartPatchAsync(tmp));
    await dispatch(postOrderAsync(obj2));
    await dispatch(getUsersAsync(cartData.userSlice.userinfo?.id));
    navigate('/payment');

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
              {isModal ? (
                <CartModal>장바구니에 상품이 없습니다</CartModal>
              ) : null}
              <OrderTitle>전체 합계</OrderTitle>
              <OrderLine />
              <OrderTextContainer>
                <OrderText>
                  <OrderTextTitle>총 상품금액</OrderTextTitle>
                  <OrderTextContents>
                    {cartData.cartSlice.totalPrice.toLocaleString('en')}원
                  </OrderTextContents>
                </OrderText>
                <OrderText>
                  <OrderTextTitle>총 배송비</OrderTextTitle>
                  <OrderTextContents>
                    {cartData.cartSlice.totalDelivery.toLocaleString('en')}원
                  </OrderTextContents>
                </OrderText>
              </OrderTextContainer>
              <OrderLine />
              <OrderTotalPrice>
                <OrderTotalPriceTtile>전체금액</OrderTotalPriceTtile>
                <OrderTotalPriceContents>
                  {(
                    cartData.cartSlice.totalPrice +
                    cartData.cartSlice.totalDelivery
                  ).toLocaleString('en')}
                  원
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

const Container = styled.div`
  display: flex;
  margin-top: 65px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Noto Sans KR;
  @media only screen and (max-width: 768px) {
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
  margin-bottom: 30px;
  width: 80%;
  max-width: 1200px;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    width: 95%;
    margin-bottom: 0px;
  }
`;

const CartListContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  min-height: 600px;
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
  @media only screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 200px;
  }
  @media only screen and (max-width: 768px) {
    margin-bottom: 200px;
  }
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
  @media only screen and (max-width: 1200px) {
    bottom: 0px;
    width: 100%;
    height: 200px;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const OrderTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const OrderLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 0px;
  width: 100%;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const OrderTextContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
  }
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

export default Cart;
