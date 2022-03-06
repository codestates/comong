import React from 'react';
import styled from 'styled-components';
import ButtonSimple from '../common/button/ButtonSimple';
import { shippingStatus } from '../sales-history/SalesHistoryStatus';
import { IOrderData } from './OrderHistory';

const Wrapper = styled.div`
  padding: 1.6rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  background-color: white;
  @media only screen and (max-width: 1200px) {
    padding: 1.2rem 0.2rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 0.8rem 0.2rem;
  }
`;

const OrderImg = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 0.5rem;
  @media only screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

const OrderInfo = styled.div`
  width: 60%;
  height: 7rem;
  display: flex;
  /* @media only screen and (max-width: 1200px) {
    width: 55%;
    height: 100px;
  } */
  @media only screen and (max-width: 768px) {
    height: 4rem;
  }
`;

const OrderItemInfo = styled.div`
  width: 70%;
  height: 100%;
  padding: 0.7rem 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    padding: 0.5rem 0.4rem;
  }

  span.item__title {
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    @media only screen and (max-width: 768px) {
      font-size: 0.7rem;
    }
  }

  div.item__price-date-wrapper {
    width: 70%;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    @media only screen and (max-width: 768px) {
      font-size: 0.4rem;
    }
  }

  span.item__price {
  }

  span.item__date {
    color: ${(props) => props.theme.colors.darkGrey};
  }

  span.item__status {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};
    @media only screen and (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

const OrderSellerInfo = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;

  span.seller__name {
    font-size: 1rem;
    @media only screen and (max-width: 768px) {
      font-size: 0.6rem;
    }
  }

  span.seller__contact {
    font-size: 0.8rem;
    @media only screen and (max-width: 768px) {
      font-size: 0.6rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  background-color: pink;
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media only screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

interface IOrderHistoryListItem {
  order: IOrderData;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function OrderHistoryListItem({
  order,
  showEdit,
  setShowEdit,
}: IOrderHistoryListItem) {
  const {
    item_info: itemInfo,
    order_detail_info: orderInfo,
    shipping_status: shippingInfo,
  } = order;

  const shippingType: { [key: string]: string } = {
    pending: '결제확인중',
    processing: '배송준비중',
    intransit: '배송중',
  };
  return (
    <Wrapper>
      <OrderImg src={itemInfo.image_src.split(',')[0]} />
      <OrderInfo>
        <OrderItemInfo>
          <span className="item__title">{itemInfo.contents}</span>
          <div className="item__price-date-wrapper">
            <span className="item__price">{itemInfo.price}원</span>
            <span className="item__date">
              {orderInfo.createdAt.split('T')[0]}
            </span>
          </div>
          <span className="item__status">{shippingType[shippingInfo]}</span>
        </OrderItemInfo>
        <OrderSellerInfo>
          <span className="seller__name">{orderInfo.user.storename}</span>
          <span className="seller__contact">{orderInfo.user.mobile}</span>
        </OrderSellerInfo>
      </OrderInfo>
      <ButtonWrapper>
        <ButtonSimple
          buttonClickHandler={() => {
            setShowEdit(!showEdit);
          }}
        >
          후기 쓰기
        </ButtonSimple>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default OrderHistoryListItem;
