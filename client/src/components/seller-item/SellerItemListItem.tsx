import React from 'react';
import styled from 'styled-components';
import ButtonSimple from '../common/button/ButtonSimple';

const Wrapper = styled.div`
  max-width: 800px;
  height: 150px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  background-color: white;
`;

const OrderImg = styled.img`
  width: 80px;
  height: 80px;
`;

const OrderInfo = styled.div`
  width: 60%;
  height: 110px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span.item__title {
    font-size: 18px;
    font-weight: 700;
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

  @media only screen and (max-width: 1200px) {
    width: 55%;
    height: 100px;
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

function SellerItemListItem() {
  return (
    <Wrapper>
      <OrderImg src="/img/image.png" />
      <OrderInfo>
        <span className="item__title">상품 제목 렌즈 세척액 용기 어쩌구</span>
        <div className="item__price-date-wrapper">
          <span className="item__price">3000원</span>
          <span className="item__date">작성날짜</span>
        </div>
      </OrderInfo>
      <ButtonWrapper>
        <ButtonSimple buttonClickHandler={() => {}}>수정하기</ButtonSimple>
        <ButtonSimple buttonClickHandler={() => {}}>삭제하기</ButtonSimple>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default SellerItemListItem;
