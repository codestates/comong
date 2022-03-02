import React from 'react';
import styled from 'styled-components';
import ButtonSimple from '../common/button/ButtonSimple';
import { shippingStatus } from '../sales-history/SalesHistoryStatus';
import { IOrderData } from './OrderHistory';

const Wrapper = styled.div`
  height: 200px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  background-color: white;
`;

const OrderImg = styled.img`
  width: 110px;
  height: 110px;
`;

const OrderInfo = styled.div`
  width: 60%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1200px) {
    width: 55%;
    height: 100px;
  }
`;

const OrderItemInfo = styled.div`
  width: 70%;
  height: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span.item__title {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  div.item__price-date-wrapper {
    width: 50%;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 1200px) {
      width: 70%;
    }
  }

  span.item__price {
    font-size: 16px;
  }

  span.item__date {
    font-size: 16px;
    color: ${(props) => props.theme.colors.darkGrey};
  }

  span.item__status {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};
  }
`;

const OrderSellerInfo = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  span.seller__name {
    font-size: 18px;
  }

  span.seller__contact {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  width: 15%;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 1200px) {
    width: 20%;
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
  const { item_info: itemInfo, order_detail_info: orderInfo } = order;
  console.log(itemInfo);
  console.log(orderInfo);

  return (
    <Wrapper>
      <OrderImg src={itemInfo.image_src} />
      <OrderInfo>
        <OrderItemInfo>
          <span className="item__title">{itemInfo.contents}</span>
          <div className="item__price-date-wrapper">
            <span className="item__price">{itemInfo.price}원</span>
            <span className="item__date">
              {orderInfo.createdAt.split('T')[0]}
            </span>
          </div>
          <span className="item__status">{shippingStatus['']}</span>
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
        <ButtonSimple buttonClickHandler={() => {}}>
          교환/환불 요청
        </ButtonSimple>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default OrderHistoryListItem;
