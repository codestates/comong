import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import type { RootState } from '../redux/configStore';
import { useNavigate } from 'react-router-dom';
import { getCartPatchAsync } from '../redux/modules/cartSlice';
import OrderInfo from '../components/Payment/OrderInfo';
import { Form, Input, Button } from 'antd';
import queryString from 'query-string';
import { setPaymentInfo } from '../redux/modules/cartSlice';
import { setDestinationInfo } from '../redux/modules/cartSlice';
import { setSubTotalPrice } from '../redux/modules/cartSlice';
import { PaymentModal } from '../components/Modals/PaymentModal';

import { setLoading } from '../redux/modules/loadingSlice';

const Payment = () => {
  const cartData = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  const isLogin = cartData.userSlice.isLogin;

  useEffect(() => {
    dispatch(setSubTotalPrice(['deleteAll']));
    dispatch(setLoading(false));
    if (!isLogin) navigate('/');
  }, []);

  const [autoInfo, setAutoInfo] = useState<boolean>(false);

  let defaultData = {
    name: cartData.userSlice.userinfo?.name || '',
    tel: cartData.cartSlice.addressInfo.mobile || '',
    email: cartData.cartSlice.addressInfo.email || '',
    postCode: String(cartData.cartSlice.addressInfo.postal_code) || '',
    address1: cartData.cartSlice.addressInfo.address_line1 || '',
    address2: cartData.cartSlice.addressInfo.address_line2 || '',
  };
  const [shipData, setShipData] = useState<{
    name: string;
    tel: string;
    email: string;
    postCode: string;
    address1: string;
    address2: string;
  }>({
    name: '',
    tel: '',
    email: '',
    postCode: '',
    address1: '',
    address2: '',
  });

  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  let orderInfo = cartData.cartSlice.orderInfo;
  console.log('orderInfo', orderInfo);
  console.log('cartData.cartSlice', cartData.cartSlice);

  const payHandler = async (values: any) => {
    console.log('페이핸들러-끝');
    console.log('페이핸들러-시작');
    if (
      name === '' ||
      tel === '' ||
      email === '' ||
      postCode === '' ||
      address1 === '' ||
      address2 === ''
    ) {
      setIsModal(!isModal);
      return;
    }
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

    let userCode = process.env.REACT_APP_IMPORT_CLIENT_ID;
    /* 결제 데이터 */
    const {
      pg = 'kcp',
      pay_method = 'card',
      merchant_uid,
      card_name = '홍길동',
      amount = cartData.cartSlice.totalPrice + cartData.cartSlice.totalDelivery,
      // amount = '1',
      buyer_name = name,
      buyer_tel = tel,
      buyer_email = email,
    } = values;

    const data: paymentData = {
      order_id: orderInfo.id,
      pg,
      pay_method,
      merchant_uid,
      card_name,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
    };

    const { IMP } = window;
    console.log('userCode', userCode);
    IMP.init(userCode);
    IMP.request_pay(data, callback);
  };

  function callback(response: {
    paid_amount: number;
    imp_uid: string;
    merchant_uid: string;
    buyer_name: string;
    status: string;
    success: boolean;
    error_msg: string;
  }) {
    const query = queryString.stringify(response);
    let data = {
      user_id: orderInfo.user_id,
      order_id: orderInfo.id,
      total_amount: response.paid_amount,
      imp_uid: response.imp_uid,
      merchant_uid: response.merchant_uid,
      buyer_name: response.buyer_name,
      status: response.status,
      success: response.success,
      error_msg: response.error_msg,
    };
    console.log('payment-data', data);
    dispatch(setPaymentInfo(data));
    let list = {
      name: name,
      tel: tel,
      email: email,
      postCode: postCode,
      address1: address1,
      address2: address2,
    };
    dispatch(setDestinationInfo(list));
    navigate(`/paymentresult`);
  }

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '50px',
    zIndex: '100',
    padding: '7px',
  };

  const changeShipName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const changeShipTel = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTel(e.target.value);
  const changeShipEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const changeShipPostCode = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPostCode(e.target.value);
  const changeShipAddress1 = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress1(e.target.value);
  const changeShipAddress2 = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress2(e.target.value);

  const handleAutoInfo = () => {
    setAutoInfo(!autoInfo);
    if (!autoInfo) {
      setName(defaultData.name);
      setTel(defaultData.tel);
      setEmail(defaultData.email);
      setPostCode(defaultData.postCode);
      setAddress1(defaultData.address1);
      setAddress2(defaultData.address2);
    } else {
      setName('');
      setTel('');
      setEmail('');
      setPostCode('');
      setAddress1('');
      setAddress2('');
    }
  };
  return (
    <Container>
      <CartContainer>
        <TitleContainer>
          <CartTitle>주문/결제</CartTitle>
        </TitleContainer>
        <ContentsBackground>
          <ContentsContainer>
            <InfoContainer>
              <DestinationContainer>
                <Title>보내는 사람</Title>
                <TitleLine></TitleLine>
                <Contents>
                  <InputContainer>
                    <InputTitle>이름</InputTitle>
                    <UserContents>{defaultData.name}</UserContents>
                  </InputContainer>
                  <InputContainer>
                    <InputTitle>연락처</InputTitle>
                    <UserContents>{defaultData.tel}</UserContents>
                  </InputContainer>
                  <InputContainer>
                    <InputTitle>이메일</InputTitle>
                    <UserContents>{defaultData.email}</UserContents>
                  </InputContainer>
                  <InputContainer>
                    <InputTitle>주소</InputTitle>
                    <AddressContainer>
                      <AddressContents>{defaultData.postCode}</AddressContents>
                      <AddressContents>{defaultData.address1}</AddressContents>
                      <AddressContents>{defaultData.address2}</AddressContents>
                    </AddressContainer>
                  </InputContainer>
                </Contents>
              </DestinationContainer>
              <DestinationContainer>
                <Title>배송지 정보</Title>
                <TitleLine></TitleLine>
                <Contents>
                  <ButtonLabel>
                    <AutoInfoButton
                      type="radio"
                      id="radio"
                      checked={autoInfo}
                      onClick={handleAutoInfo}
                    />
                    &nbsp;&nbsp;보내는사람과 동일
                  </ButtonLabel>
                  <InputContainer>
                    <InputTitle>이름</InputTitle>
                    <IntputContentsName
                      value={name}
                      onChange={changeShipName}
                    />
                  </InputContainer>
                  <InputContainer>
                    <InputTitle>연락처</InputTitle>
                    <IntputContentsName
                      type="text"
                      value={tel}
                      onChange={changeShipTel}
                    />
                  </InputContainer>
                  <InputContainer>
                    <InputTitle>이메일</InputTitle>
                    <IntputContents
                      value={email}
                      onChange={changeShipEmail}
                    ></IntputContents>
                  </InputContainer>
                  <InputContainer>
                    <InputTitle>주소</InputTitle>
                    <AddressContainer>
                      <AddressContents2postal
                        value={postCode}
                        onChange={changeShipPostCode}
                      ></AddressContents2postal>
                      <AddressContents2
                        value={address1}
                        onChange={changeShipAddress1}
                      ></AddressContents2>
                      <AddressContents2
                        value={address2}
                        onChange={changeShipAddress2}
                      ></AddressContents2>
                    </AddressContainer>
                  </InputContainer>
                </Contents>
              </DestinationContainer>

              <OrderInfo></OrderInfo>
            </InfoContainer>

            <OrderContainer>
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
        {isModal ? (
          <PaymentModal>배송정보를 모두 입력해주세요</PaymentModal>
        ) : null}
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
      <FormContainer>
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
  card_name: string;
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
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const DestinationContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 95%;
  margin-right: 20px;
  margin-bottom: 20px;
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
  }
`;

const Title = styled.div`
  font-size: 17px;
`;

const TitleLine = styled.hr`
  margin: 15px 0px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const AutoInfoButton = styled.input``;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 10px;
  width: 500px;
  /* justify-content: space-between; */
`;
const InputTitle = styled.div`
  margin: 5px 10px;
  font-size: 15px;
  color: ${(props) => props.theme.colors.charcol};
  width: 70px;
`;

const UserContents = styled.div`
  margin: 5px 5px;
  font-size: 15px;
  color: ${(props) => props.theme.colors.charcol};
  width: 400px;
`;

const IntputContents = styled.input`
  font-family: Noto Sans KR;
  font-size: 15px;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.charcol};
  width: 250px;
  border: 2px solid ${(props) => props.theme.colors.darkGrey};
  border-radius: 5px;
`;
const IntputContentsName = styled.input`
  font-family: Noto Sans KR;
  font-size: 15px;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.charcol};
  width: 150px;
  border: 2px solid ${(props) => props.theme.colors.darkGrey};
  border-radius: 5px;
`;

const AddressContainer = styled.div`
  margin: 5px 0px;
  font-size: 15px;
  color: ${(props) => props.theme.colors.charcol};
  width: 350px;
`;

const AddressContents = styled.div`
  width: 100%;
  margin-left: 5px;
  margin-bottom: 7px;
`;
const AddressContents2 = styled.input`
  font-family: Noto Sans KR;
  font-size: 15px;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.charcol};
  width: 300px;
  border: 2px solid ${(props) => props.theme.colors.darkGrey};
  border-radius: 5px;
  margin-bottom: 3px;
`;
const AddressContents2postal = styled.input`
  font-family: Noto Sans KR;
  font-size: 15px;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.charcol};
  width: 80px;
  border: 2px solid ${(props) => props.theme.colors.darkGrey};
  border-radius: 5px;
  margin-bottom: 3px;
`;

const ButtonLabel = styled.label`
  font-size: 14px;
  color: ${(props) => props.theme.colors.charcol};
  margin-bottom: 10px;
`;
const IntputContentsLong = styled.input``;

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
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: large;
  font-weight: bold;
  background-color: #bdbdbd;
  display: none;
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
  display: none;
`;

const FormContainer = styled(Form)`
  width: 350px;
  border-radius: 3px;
  display: none;
  .ant-row {
    margin-bottom: 1rem;
  }
`;

export default Payment;
