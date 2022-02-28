import React from 'react';
import styled from 'styled-components';
import { IPatchOrderParams, patchOrdersSeller } from '../../apis/api/order';
import { ISalesList } from '../../pages/mypage/mypage_seller/MypageSellerDefault';
import ButtonSimple from '../common/button/ButtonSimple';

const SalesStatus = styled.div`
  width: 50%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
`;

export const orderStatus: { [key: string]: string } = {
  pending: '결제 대기 중',
  paid: '결제 완료',
  canceled: '거래 취소',
};

export const shippingStatus: { [key: string]: string } = {
  pending: '결제 승인',
  processing: '배송 준비중',
  intransit: '배송중',
  delivered: '배송 완료',
  canceled: '취소',
  returned: '환불',
};

interface ISalesHistoryStatus {
  order: ISalesList;
  showTrackingNumForm: boolean;
  setShowTrackingNumForm: React.Dispatch<React.SetStateAction<boolean>>;
}
function SalesHistoryStatus({
  order,
  showTrackingNumForm,
  setShowTrackingNumForm,
}: ISalesHistoryStatus) {
  const { order_info: orderInfo } = order;

  console.log(orderInfo);

  const payload: IPatchOrderParams = {
    order_id: orderInfo.id,
    shipping_status: orderInfo.shipping_status,
  };

  const showButton: { [key: string]: JSX.Element } = {
    pending: (
      <ButtonSimple
        buttonClickHandler={() => {
          payload.shipping_status = 'processing';
          patchOrdersSeller(payload);
        }}
      >
        결제 승인
      </ButtonSimple>
    ),
    processing: (
      <ButtonSimple
        buttonClickHandler={(e) => {
          e.stopPropagation();
          setShowTrackingNumForm(!showTrackingNumForm);
        }}
      >
        송장 입력
      </ButtonSimple>
    ),
  };

  return (
    <>
      <SalesStatus>{orderStatus[orderInfo.status]}</SalesStatus>
      {orderInfo.status !== 'pending' && (
        <ButtonWrapper>{showButton[orderInfo.shipping_status]}</ButtonWrapper>
      )}
    </>
  );
}

export default SalesHistoryStatus;
