import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem 0;
  margin-bottom: 3rem;
`;

const SellerOrderStateWapper = styled.div`
  display: flex;
`;

const SellerOrderState = styled.div`
  width: 100%;
  padding: 1.5rem;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 1200px) {
    padding: 5px 0;
    height: 8vw;
  }

  span.userOrder-title {
    font-size: 1.2rem;
    font-weight: 700;

    @media only screen and (max-width: 1200px) {
      font-size: 16px;
    }
  }

  span.userOrder-content {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};

    @media only screen and (max-width: 1200px) {
      font-size: 20px;
    }
  }
`;

interface ISellerOrderStateList {
  orderStatusNum: {
    [key: string]: number;
  };
}

function SellerOrderStateList({ orderStatusNum }: ISellerOrderStateList) {
  const orderType: { [key: string]: string } = {
    pending: '신규주문',
    processing: '배송준비중',
    intransit: '배송중',
    delivered: '배송완료',
    returned: '취소/반품',
  };

  const showStatus = () => {
    let result = [];
    for (let key in orderType) {
      result.push(
        <SellerOrderState>
          <span className="userOrder-title">{orderType[key]}</span>
          <span className="userOrder-content">{orderStatusNum[key]}</span>
        </SellerOrderState>,
      );
    }
    return result;
  };

  return (
    <Wrapper>
      <SellerOrderStateWapper>{showStatus()}</SellerOrderStateWapper>
    </Wrapper>
  );
}

export default SellerOrderStateList;
