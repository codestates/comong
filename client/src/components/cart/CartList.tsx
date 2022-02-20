import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartSeller from './CartSeller';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getCartAsync } from '../../redux/modules/cartSlice';
import type { RootState } from '../../redux/configStore';
import { group } from 'console';

const SellerContainer = styled.div`
  background-color: white;
  margin: 20px 0px;
`;

const SellerName = styled.div`
  font-weight: 600;
`;
const SellerLine = styled.hr`
  margin: 10px 0px;
`;

const CartList = () => {
  const cartData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getCartAsync());
  }, []);

  let data = cartData.cartSlice.data[0];
  console.log('cartData', cartData);
  let list = [];
  let group: string[] = [];
  for (let x in data) {
    // console.log(x, data[x]);
    list.push(data[x]);
    group.push(x);
  }
  // console.log(list);

  let name = '12%+15%중복할인 알로앤루알퐁소 베이비페어 빅세일';
  let img_src = 'http://gdimg.gmarket.co.kr/981887465/still/600?ver=1583286904';

  return (
    <>
      {list.map((el: any, i) => {
        console.log(Array.isArray(el));
        return (
          <div>
            <SellerContainer>
              <SellerName>{el.storeInfo.name}</SellerName>
              <SellerLine />
            </SellerContainer>
            <CartSeller
              storeName={el.storeInfo.name}
              groupName={group[i]}
              data={el.order_details}
            ></CartSeller>
          </div>
        );
      })}
    </>
  );
};

export default CartList;
