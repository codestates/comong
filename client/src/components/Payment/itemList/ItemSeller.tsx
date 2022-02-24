import styled from 'styled-components';
import ItemSellerItem from './ItemSellerItem';
import { useState, useEffect } from 'react';
import { setSubTotalPrice } from '../../../redux/modules/cartSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/configStore.hooks';
import type { RootState } from '../../../redux/configStore';
import { setTotalPrice } from '../../../redux/modules/cartSlice';
import { v4 as uuidv4 } from 'uuid';

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
`;

const CartSumPrice = styled.div``;
const CartSumIcon = styled.img`
  width: 28px;
`;
const CartSumPriceTitle = styled.div`
  color: gray;
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 14px;
`;
const CartSumPriceContents = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.charcol};
`;

const ItemSeller = ({ data, storeName, groupName }: any) => {
  const Cartdata = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  // let sellerTotal: number | string = 0;

  // for (let i = 0; i < data.length; i++) {
  //   sellerTotal += data[i].peritem_price * data[i].order_amount;
  // }

  // useEffect(() => {
  //   dispatch(setSubTotalPrice([groupName, sellerTotal]));
  //   dispatch(setTotalPrice(Cartdata.cartSlice.subTotalPrice));
  // }, [sellerTotal]);

  // let subTotalPrice: number | string = Number(
  //   Cartdata.cartSlice.subTotalPrice[groupName],
  // );

  // let deliveryFee: number | string = 3000;
  // let total: number | string = Number(subTotalPrice) + deliveryFee;

  return (
    <MainContainer>
      <CartListItemContents>
        {data.map((el: any) => {
          return (
            <ItemSellerItem
              key={uuidv4()}
              storeName={storeName}
              groupName={groupName}
              data={el}
            ></ItemSellerItem>
          );
        })}
      </CartListItemContents>
      <CartSumContainer>
        <CartSumPrice>
          <CartSumPriceTitle>상품금액</CartSumPriceTitle>
          <CartSumPriceContents>
            {Cartdata.cartSlice.totalPrice.toLocaleString('en')}원
          </CartSumPriceContents>
        </CartSumPrice>
        <CartSumIcon src="/icons/cart/plus.png" />
        <CartSumPrice>
          <CartSumPriceTitle>배송비</CartSumPriceTitle>
          <CartSumPriceContents>
            {Cartdata.cartSlice.totalDelivery.toLocaleString('en')}원
          </CartSumPriceContents>
        </CartSumPrice>
        <CartSumIcon src="/icons/cart/equal.png" />
        <CartSumPrice>
          <CartSumPriceTitle>주문금액</CartSumPriceTitle>
          <CartSumPriceContents>
            {(
              Cartdata.cartSlice.totalPrice + Cartdata.cartSlice.totalDelivery
            ).toLocaleString('en')}
            원
          </CartSumPriceContents>
        </CartSumPrice>
      </CartSumContainer>
    </MainContainer>
  );
};

export default ItemSeller;
