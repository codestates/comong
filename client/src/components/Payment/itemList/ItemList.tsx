import { useEffect } from 'react';
import styled from 'styled-components';
import ItemSeller from './ItemSeller';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/configStore.hooks';
import { getCartAsync } from '../../../redux/modules/cartSlice';
import type { RootState } from '../../../redux/configStore';
import { setTotalPrice } from '../../../redux/modules/cartSlice';
import { v4 as uuidv4 } from 'uuid';

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

const ItemList = () => {
  const cartData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   dispatch(getCartAsync());
  //   dispatch(setTotalPrice(cartData.cartSlice.subTotalPrice));
  // };

  let data = cartData.cartSlice.data[0];

  let list = [];
  let group: string[] = [];
  for (let x in data) {
    list.unshift(data[x]);
    group.unshift(x);
  }

  // console.log('list', list);
  // let sub_price = 0;
  // let arr: any = [];

  // for (let x in cartData.cartSlice.subTotalPrice) {
  //   if (cartData.cartSlice.subTotalPrice[x] > 0)
  //     arr.push(cartData.cartSlice.subTotalPrice[x]);
  // }
  // console.log('arr', arr);
  let arr = list.map((el, i) => {
    // console.log(el.order_details);
    let sum = 0;
    for (let x of el.order_details) {
      sum += x.peritem_price * x.order_amount;
    }

    return sum;
  });
  console.log(arr);

  return (
    <>
      {list.map((el: any, i) => {
        return (
          <div key={uuidv4()}>
            <SellerContainer key={uuidv4()}>
              <SellerName key={uuidv4()}>{el.storeInfo.name}</SellerName>
              <SellerLine key={uuidv4()} />
            </SellerContainer>
            <ItemSeller
              key={uuidv4()}
              storeName={el.storeInfo.name}
              groupName={group[i]}
              data={el.order_details}
              subTotal={arr[i]}
            ></ItemSeller>
          </div>
        );
      })}
    </>
  );
};

export default ItemList;
