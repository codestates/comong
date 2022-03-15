import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ISalesList } from '../../pages/mypage/mypage_seller/MypageSellerDefault';
import SaleHistoryDetails from './SaleHistoryDetails';
import { cellWidth } from './SalesHistoryTableProperty';
import SalesHistoryStatus from './SalesHistoryStatus';
import ButtonSimple from '../common/button/ButtonSimple';
import SalesHistoryTrackingNum from './SalesHistoryTrackingNum';

const SalesHistoryListItem = styled.div`
  width: 100%;
  display: flex;
  font-size: 12.5px;

  > div {
    border-right: 1px solid ${(props) => props.theme.colors.darkGrey};
    border-bottom: 1px solid black;
  }

  > div:last-child {
    border-right: none;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.greyForBackGround};
  }
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cell = styled.div`
  ${center}
  ${cellWidth}

  &.order-date {
    flex-direction: column;
    gap: 8px;

    span.order-number {
      font-size: 12px;
    }
  }

  &.order-info {
    justify-content: flex-start;
    padding: 10px;
    gap: 10px;
  }

  &.order-price {
    flex-direction: column;
  }

  &.order-status {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  &.order-cancel {
    padding: 0 8px;
  }
`;

const SalesImg = styled.img`
  width: 100px;
  height: 100px;
  background-color: orange;
`;

const SalesItemBasicInfo = styled.div`
  display: flex;
  line-height: 1.2rem;
  width: 80%;

  span.item__title {
    max-width: 80%;
    margin-right: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

interface ISalesHistoryTableRow {
  order: ISalesList;
}

function SalesHistoryTableRow({ order }: ISalesHistoryTableRow) {
  const [showDetails, setShowDetails] = useState(false);
  const [showTrackingNumForm, setShowTrackingNumForm] = useState(false);
  const { order_detail_info: orderItemInfo, order_info: orderInfo } = order;

  return (
    <>
      <SalesHistoryListItem onClick={() => setShowDetails(!showDetails)}>
        <Cell className="order-date">
          <span>{orderInfo.createdAt.split('T')[0]}</span>
          <span className="order-number">{orderInfo.id}</span>
        </Cell>
        <Cell className="order-info">
          <SalesImg
            src={orderItemInfo[0].item_info.image_src.split(',')[0]}
          ></SalesImg>
          <SalesItemBasicInfo>
            <span className="item__title">
              {orderItemInfo[0].item_info.title}
            </span>
            {orderItemInfo.length > 1 && (
              <span>외 {orderItemInfo.length - 1}건</span>
            )}
          </SalesItemBasicInfo>
        </Cell>
        <Cell className="order-price">
          <span>{orderInfo.total_amount}원</span>
        </Cell>
        <Cell className="order-status">
          <SalesHistoryStatus
            order={order}
            showTrackingNumForm={showTrackingNumForm}
            setShowTrackingNumForm={setShowTrackingNumForm}
          ></SalesHistoryStatus>
        </Cell>
        <Cell className="order-cancel">
          <span>{orderInfo.status === 'canceled' ? '처리완료' : '-'}</span>
        </Cell>
      </SalesHistoryListItem>
      {showTrackingNumForm && (
        <SalesHistoryTrackingNum
          orderId={orderInfo.id}
        ></SalesHistoryTrackingNum>
      )}
      {showDetails && <SaleHistoryDetails order={order}></SaleHistoryDetails>}
    </>
  );
}

export default SalesHistoryTableRow;
