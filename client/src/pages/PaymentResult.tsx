import styled from 'styled-components';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CheckOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import queryString from 'query-string';
import axios, { AxiosRequestConfig } from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import type { RootState } from '../redux/configStore';
import { config } from '../config/config';

const env = 'development';
const urlConfig = config[env];

function PaymentResult() {
  const payData = useAppSelector((state: RootState) => state);
  let data = payData.cartSlice.paymentInfo;

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const search = window.location.search;
  const query = queryString.parse(search);

  // const { merchant_uid, error_msg, imp_uid, paid_amount, status } = query;
  const merchant_uid = data.merchant_uid;
  const error_msg = data.error_msg;
  const imp_uid = data.imp_uid;
  let isSucceeded = payData.cartSlice.paymentInfo.success;

  // 추후 다른 결제수단이 추가 될 경우 대비한 코드
  // function getIsSuccessed() {
  //   const { success, imp_success } = query;
  //   const success = data.status;
  //   const imp_success = data.status;
  //   if (typeof imp_success === 'string') return imp_success === 'true';
  //   if (typeof imp_success === 'boolean') return imp_success === true;
  //   if (typeof success === 'string') return success === 'true';
  //   if (typeof success === 'boolean') return success === true;
  // }
  // const isSucceeded = getIsSuccessed();

  const iconType = isSucceeded ? (
    <CheckOutlined />
  ) : (
    <ExclamationCircleOutlined />
  );
  const resultType = isSucceeded ? '성공' : '실패';
  const colorType = isSucceeded ? '#52c41a' : '#f5222d';

  const paymentValidation = async function () {
    let data = payData.cartSlice.paymentInfo;
    console.log(data);

    let tmp = {
      user_id: data.user_id,
      order_id: data.order_id,
      payment_method: 'card',
      total_amount: data.total_amount, //sum of total item price + shipping charge
      imp_uid: data.imp_uid,
      merchant_uid: data.merchant_uid,
      buyer_name: data.buyer_name,
      status: data.status,
    };

    console.log(tmp);
    const destination = payData.cartSlice.destinationInfo;

    const paymentValidationOptions: AxiosRequestConfig = {
      method: 'POST',
      url: `${urlConfig.url}/payments`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        user_id: data.user_id,
        order_id: data.order_id,
        payment_method: 'card',
        total_amount: data.total_amount, //sum of total item price + shipping charge
        imp_uid: data.imp_uid,
        merchant_uid: data.merchant_uid,
        buyer_name: data.buyer_name,
        status: data.status,
        address_line1: destination.address1,
        address_line2: destination.address2,
        postal_code: destination.postCode,
        email: destination.email,
        contact: destination.tel,
      },
    };
    await axios(paymentValidationOptions)
      .then((responese) => console.log(responese))
      .catch((err) => console.log(err));
  };

  if (isSucceeded) {
    paymentValidation();
  }

  return (
    <Wrapper>
      <Container color={colorType}>
        {iconType}
        <p>{`결제에 ${resultType}하였습니다`}</p>
        <ul>
          <li>
            <span>주문번호</span>
            <span>{merchant_uid}</span>
          </li>
          {isSucceeded ? (
            <li>
              <span>아임포트 번호</span>
              <span>{imp_uid}</span>
            </li>
          ) : (
            <li>
              <span>에러 메시지</span>
              <span>{error_msg}</span>
            </li>
          )}
        </ul>
        <Button size="large" onClick={() => navigate('/')}>
          <ArrowLeftOutlined />
          돌아가기
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;

  > .anticon {
    font-size: 10rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${(props) => props.color};
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 3rem;

    li {
      display: flex;
      line-height: 2;
      span:first-child {
        width: 8rem;
        color: #888;
      }
      span:last-child {
        width: calc(100% - 8rem);
        color: #333;
      }
    }
  }

  button,
  button:hover {
    border-color: ${(props) => props.color};
    color: ${(props) => props.color};
  }
  button:hover {
    opacity: 0.7;
  }
`;

export default PaymentResult;
