import React from 'react';
import styled from 'styled-components';
import {
  IOrderDetailInfo,
  ISalesList,
} from '../../pages/mypage/mypage_seller/MypageSellerDefault';
import SalesHistoryDetailsListItem from './SalesHistoryDetailsListItem';

const Wrapper = styled.div`
  width: 100%;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.colors.greyForBackGround};
  font-size: 14px;
`;

const ShippingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  h3 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 6px;
  }
`;

const ShippingRow = styled.div`
  display: flex;

  div {
    padding: 8px 0 8px 10px;
  }

  div.title {
    background-color: ${(props) => props.theme.colors.darkGrey};
    width: 15%;
    margin: 2px 0;
  }

  div.adress {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

interface ISaleHistoryDetails {
  order: ISalesList;
}

function SaleHistoryDetails({ order }: ISaleHistoryDetails) {
  const { order_detail_info: orderItemInfo, order_info: orderInfo } = order;
  console.log(orderInfo);
  return (
    <Wrapper>
      <ShippingWrapper>
        <h3>배송지 정보</h3>
        <ShippingRow>
          <div className="title">수령인</div>
          <div>{orderInfo.buyer_name}</div>
        </ShippingRow>
        <ShippingRow>
          <div className="title">연락처</div>
          <div>{orderInfo.contact}</div>
        </ShippingRow>
        <ShippingRow>
          <div className="title">배송지</div>
          <div className="adress">
            <span>{orderInfo.postal_code}</span>
            <span>
              {orderInfo.address_line1} {orderInfo.address_line2}
            </span>
          </div>
        </ShippingRow>
        <ShippingRow>
          <div className="title">배송업체</div>
          <div className="adress">
            <span>{orderInfo.shipping_company}</span>
          </div>
        </ShippingRow>
      </ShippingWrapper>
      {orderItemInfo.map((item) => (
        <SalesHistoryDetailsListItem item={item}></SalesHistoryDetailsListItem>
      ))}
    </Wrapper>
  );
}

export default SaleHistoryDetails;
