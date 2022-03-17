import React from 'react';
import styled from 'styled-components';
import { IOrderDetailInfo } from '../../pages/mypage/mypage_seller/MypageSellerDefault';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-radius: 4px;
`;

const Cell = styled.div`
  &.info-item {
    width: 70%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &.info-price {
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    > span:nth-child(2) {
      font-weight: 700;
    }
  }

  &.info-stock {
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    font-weight: 700;
  }
`;

const SalesImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 4px;
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
        <SalesImg src={itemInfo.image_src.split(',')[0]}></SalesImg>
        <SalesItemBasicInfo>
          <span className="item__title">{itemInfo.title}</span>
        </SalesItemBasicInfo>
      </Cell>
      <Cell className="info-price">
        <span>{orderInfo.peritem_price}원</span>
        <span>{orderInfo.order_amount}개</span>
      </Cell>
      <Cell className="info-stock">
        <span>재고</span>
        <span>
          {itemInfo.item_inventories && itemInfo.item_inventories[0].stock}개
        </span>
      </Cell>
    </Wrapper>
  );
}

export default SalesHistoryDetailsListItem;
