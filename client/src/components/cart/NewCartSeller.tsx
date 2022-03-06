import styled from 'styled-components';
import CartSellerItem from './NewCartSellerItem';
import { useState, useEffect } from 'react';
import { setSubTotalPrice } from '../../redux/modules/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import type { RootState } from '../../redux/configStore';
import { setTotalPrice } from '../../redux/modules/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { getCartAsync } from '../../redux/modules/cartSlice';

const NewCartSeller = ({ data, storeName, groupName }: any) => {
  const Cartdata = useAppSelector((state: RootState) => state);

  let sellerTotal: number | string = 0;

  for (let i = 0; i < data.length; i++) {
    sellerTotal += data[i].peritem_price * data[i].order_amount;
  }

  let subTotalPrice: number | string = Number(
    Cartdata.cartSlice.subTotalPrice[groupName],
  );

  let deliveryFee: number | string = subTotalPrice ? 3000 : 0;
  let total: number | string = Number(subTotalPrice) + deliveryFee;

  return (
    <MainContainer>
      <CartListItemContents>
        {data.map((el: any) => {
          return (
            <CartSellerItem
              key={uuidv4()}
              storeName={storeName}
              groupName={groupName}
              data={el}
            ></CartSellerItem>
          );
        })}
      </CartListItemContents>
      <CartSumContainer>
        <CartSumPrice>
          <CartSumPriceTitle>상품금액</CartSumPriceTitle>
          <CartSumPriceContents>
            {subTotalPrice.toLocaleString('en')}원
          </CartSumPriceContents>
        </CartSumPrice>
        <CartSumIcon src="/icons/cart/plus.png" />
        <CartSumPrice>
          <CartSumPriceTitle>배송비</CartSumPriceTitle>
          <CartSumPriceContents>
            {deliveryFee.toLocaleString('en')}원
          </CartSumPriceContents>
        </CartSumPrice>
        <CartSumIcon src="/icons/cart/equal.png" />
        <CartSumPrice>
          <CartSumPriceTitle>주문금액</CartSumPriceTitle>
          <CartSumPriceContents>
            {total.toLocaleString('en')}원
          </CartSumPriceContents>
        </CartSumPrice>
      </CartSumContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CartListItemContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 90%;
  margin-top: 20px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const CartSumContainer = styled.div`
  margin: 20px 0px;
  height: 85px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.greyForMenu};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  padding: 10px 40px;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const CartSumPrice = styled.div``;
const CartSumIcon = styled.img`
  width: 28px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 14px;
  }
`;
const CartSumPriceTitle = styled.div`
  color: gray;
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 14px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const CartSumPriceContents = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.charcol};
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export default NewCartSeller;
