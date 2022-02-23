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

function PaymentResult() {
  let navigate = useNavigate();

  const search = window.location.search;
  const query = queryString.parse(search);

  console.log(query);
  const { merchant_uid, error_msg, imp_uid, paid_amount, status } = query;
  const isSucceeded = getIsSuccessed();

  function getIsSuccessed() {
    const { success, imp_success } = query;
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  const iconType = isSucceeded ? (
    <CheckOutlined />
  ) : (
    <ExclamationCircleOutlined />
  );
  const resultType = isSucceeded ? '성공' : '실패';
  const colorType = isSucceeded ? '#52c41a' : '#f5222d';

  const paymentValidation = async function () {
    const paymentValidationOptions: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://localhost:443/payments',
      headers: { 'Content-Type': 'application/json' },
      data: {
        user_id: 2, //temporary user_id for testing
        order_id: 7, //temporary order_id for testing
        payment_method: 'card',
        payment_status: 'paid',
        total_amount: Number(paid_amount), //sum of total item price + shipping charge
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
        buyer_name: '홍길동',
        status: status,
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
