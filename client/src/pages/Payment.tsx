import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { getCartAsync } from '../redux/modules/cartSlice';
import type { RootState } from '../redux/configStore';
import { setTotalPrice } from '../redux/modules/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getCartPatchAsync } from '../redux/modules/cartSlice';
import Destination from '../components/Payment/Destination';
import OrderCustomer from '../components/Payment/OrderCustomer';
import OrderInfo from '../components/Payment/OrderInfo';
import { Form, Input, Button } from 'antd';
import queryString from 'query-string';

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: Function;
    };
    IMP: {
      init: Function;
      request_pay: Function;
    };
  }
}

type paymentData = {
  pg: string;
  order_id: number;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
};

const { Item } = Form;

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
  justify-content: space-evenly;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  @media only screen and (max-width: 1200px) {
    width: 100%;
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
`;
const OrderTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;
const OrderLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 0px;
  width: 100%;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const OrderTextContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  @media only screen and (max-width: 1200px) {
    display: none;
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

const Paymentcontainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: large;
  font-weight: bold;
  background-color: #bdbdbd;
`;

const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 3rem;
`;

const FormContainer = styled(Form)`
  width: 350px;
  border-radius: 3px;

  .ant-row {
    margin-bottom: 1rem;
  }
`;

const Payment = () => {
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
    console.log(obj);
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

    return;
  };

  const handleSubmit = (values: any) => {
    // e.preventDefault();
    console.log('Received values of form: ', values);
    console.log('orderInfo', cartData.cartSlice.orderInfo[0]);
    let orderInfo = cartData.cartSlice.orderInfo[0];
    const userCode = process.env.REACT_APP_IMPORT_CLIENT_ID;
    /* 결제 데이터 */
    const {
      pg = 'kcp',
      pay_method = 'card',
      merchant_uid,
      name = '홍길동',
      amount = orderInfo.total_amount,
      buyer_name = '홍길동',
      buyer_tel = '01012341234',
      buyer_email = 'candymask0712@gmail.com',
    } = values;

    const data: paymentData = {
      order_id: orderInfo.id,
      pg,
      pay_method,
      merchant_uid,
      name,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
    };

    const { IMP } = window;
    IMP.init(userCode);
    IMP.request_pay(data, callback);
  };

  function callback(response: object) {
    const query = queryString.stringify(response);
    navigate(`/test/payment/result?${query}`, { replace: true });
  }

  return (
    <Container>
      <CartContainer>
        <TitleContainer>
          <CartTitle>주문/결제</CartTitle>
        </TitleContainer>
        <ContentsBackground>
          <ContentsContainer>
            <InfoContainer>
              <OrderCustomer></OrderCustomer>
              <Destination></Destination>
              <OrderInfo></OrderInfo>
            </InfoContainer>
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
      <Paymentcontainer>
        <div>this is Test-payment page</div>
        <div>Project Test-payment contents will be tested in this page</div>
        <p>I'mport TEST</p>
        <button id="check_module" type="button">
          Test Button
        </button>
        <div>{`${process.env.REACT_APP_IMPORT_CLIENT_ID}`}</div>
      </Paymentcontainer>
      <Header>아임포트 결제 테스트</Header>
      <FormContainer onFinish={handleSubmit}>
        <Item
          name="item_id"
          initialValue={'아임포트 결제 데이터 분석'}
          rules={[{ required: true, message: '상품ID는 필수입력입니다' }]}
        >
          <Input size="large" addonBefore="상품ID" />
        </Item>
        <Item
          name="order_id"
          initialValue={'type order_id'}
          rules={[{ required: true, message: 'order_id는 필수입력입니다' }]}
        >
          <Input size="large" addonBefore="order_id" />
        </Item>
        <Item
          name="amount"
          initialValue={'39000'}
          rules={[{ required: true, message: '결제금액은 필수입력입니다' }]}
        >
          <Input size="large" type="number" addonBefore="결제금액" />
          {/* )} */}
        </Item>
        <Item
          name="merchant_uid"
          initialValue={`min_${new Date().getTime()}`}
          rules={[{ required: true, message: '주문번호는 필수입력입니다' }]}
        >
          <Input size="large" addonBefore="주문번호" />
        </Item>
        <Item
          name="buyer_name"
          initialValue={'홍길동'}
          rules={[{ required: true, message: '구매자 이름은 필수입력입니다' }]}
        >
          <Input size="large" addonBefore="이름" />
        </Item>
        <Item
          name="buyer_tel"
          initialValue={'01012341234'}
          rules={[
            { required: true, message: '구매자 전화번호는 필수입력입니다' },
          ]}
        >
          <Input size="large" type="number" addonBefore="전화번호" />
          {/* )} */}
        </Item>
        <Item
          name="buyer_email"
          initialValue={'example@example.com'}
          rules={[
            { required: true, message: '구매자 이메일은 필수입력입니다' },
          ]}
        >
          <Input size="large" addonBefore="이메일" />
        </Item>
        <Button type="primary" htmlType="submit" size="large">
          결제하기
        </Button>
      </FormContainer>
    </Container>
  );
};

export default Payment;
