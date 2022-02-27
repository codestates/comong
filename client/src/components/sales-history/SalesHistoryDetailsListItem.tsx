import React from 'react';
import styled from 'styled-components';
import { IOrderDetailInfo } from '../../pages/mypage/mypage_seller/MypageSellerDefault';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
`;

const Cell = styled.div`
  &.info-item {
    width: 70%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: pink;
  }

  &.info-price {
    background-color: orange;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  &.info-stock {
    background-color: violet;
    width: 15%;
  }
`;

const SalesImg = styled.img`
  width: 70px;
  height: 70px;
  background-color: orange;
`;

const SalesItemBasicInfo = styled.div`
  display: flex;
  line-height: 1.2rem;
  width: 80%;

  span.item__title {
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

interface ISalesHistoryDetailsListItem {
  item: IOrderDetailInfo;
}

function SalesHistoryDetailsListItem({ item }: ISalesHistoryDetailsListItem) {
  const { order_detail_info: orderInfo, item_info: itemInfo } = item;
  console.log(item);
  return (
    <Wrapper>
      <Cell className="info-item">
        <SalesImg src={itemInfo.image_src}></SalesImg>
        <SalesItemBasicInfo>
          <span className="item__title">{itemInfo.title}</span>
        </SalesItemBasicInfo>
      </Cell>
      <Cell className="info-price">
        <span>{orderInfo.peritem_price}원</span>
        <span>{orderInfo.order_amount}개</span>
      </Cell>
      <Cell className="info-stock"></Cell>
    </Wrapper>
  );
}

export default SalesHistoryDetailsListItem;
