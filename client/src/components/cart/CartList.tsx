import { useEffect } from 'react';
import styled from 'styled-components';
import CartSeller from './CartSeller';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getCartAsync } from '../../redux/modules/cartSlice';
import type { RootState } from '../../redux/configStore';
import { setTotalPrice } from '../../redux/modules/cartSlice';

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
    dispatch(getCartAsync());
    dispatch(setTotalPrice(cartData.cartSlice.subTotalPrice));
  }, []);

  let data = cartData.cartSlice.data[0];

  let list = [];
  let group: string[] = [];
  for (let x in data) {
    list.push(data[x]);
    group.push(x);
  }

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
