import styled from 'styled-components';
import CartSellerItem from './CartSellerItem';
import { useState, useEffect } from 'react';
import { setSubTotalPrice } from '../../redux/modules/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getListAsync } from '../../redux/modules/listSlice';
import type { RootState } from '../../redux/configStore';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CartListItemContents = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: space-between;
  width: 90%;
  margin-top: 20px;
`;

const CartSumContainer = styled.div`
  margin: 20px 0px;
  height: 85px;
  width: 100%;
  background-color: #eef0f5;
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
  color: #242424;
`;

const CartSeller = ({ data, storeName, groupName }: any) => {
  let name = '12%+15%중복할인 알로앤루알퐁소 베이비페어 빅세일';
  let img_src = 'http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904';

  const Cartdata = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  console.log('cart-seller-data', data);

  let subTotal = data.reduce(
    (acc: number, val: { peritem_price: number; order_amount: number }) => {
      acc += val.peritem_price * val.order_amount;
    },
    0,
  );

  let sellerTotal: number | string = 0;
  let deliveryFee = 3000;
  for (let i = 0; i < data.length; i++) {
    sellerTotal += data[i].peritem_price * data[i].order_amount;
  }

  useEffect(() => {
    dispatch(setSubTotalPrice([groupName, sellerTotal]));
  }, [sellerTotal]);

  const subTotalPrice = Cartdata.cartSlice.subTotalPrice[groupName];

  // console.log('subTotal', subTotal);

  // console.log('storeName', storeName);

  return (
    <MainContainer>
      <CartListItemContents>
        {data.map((el: any) => {
          return (
            // <>
            <CartSellerItem
              storeName={storeName}
              groupName={groupName}
              data={el}
            ></CartSellerItem>
            // </>
          );
        })}
      </CartListItemContents>
      <CartSumContainer>
        <CartSumPrice>
          <CartSumPriceTitle>상품금액</CartSumPriceTitle>
          <CartSumPriceContents>{subTotalPrice}원</CartSumPriceContents>
        </CartSumPrice>
        <CartSumIcon src="/icons/cart/plus.png" />
        <CartSumPrice>
          <CartSumPriceTitle>배송비</CartSumPriceTitle>
          <CartSumPriceContents>{deliveryFee}원</CartSumPriceContents>
        </CartSumPrice>
        <CartSumIcon src="/icons/cart/equal.png" />
        <CartSumPrice>
          <CartSumPriceTitle>주문금액</CartSumPriceTitle>
          <CartSumPriceContents>
            {sellerTotal + deliveryFee}원
          </CartSumPriceContents>
        </CartSumPrice>
      </CartSumContainer>
    </MainContainer>
  );
};

export default CartSeller;
