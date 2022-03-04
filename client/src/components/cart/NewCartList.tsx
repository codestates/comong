import { useEffect } from 'react';
import styled from 'styled-components';
import CartSeller from './CartSeller';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getCartAsync } from '../../redux/modules/cartSlice';
import type { RootState } from '../../redux/configStore';
import { v4 as uuidv4 } from 'uuid';

const NewCartList = () => {
  const cartData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const userInfo = cartData.userSlice.userinfo;
  const id = userInfo?.id;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getCartAsync(id));
  };

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
        return (
          <div key={uuidv4()}>
            <SellerContainer key={uuidv4()}>
              <SellerName key={uuidv4()}>{el.storeInfo.name}</SellerName>
              <SellerLine key={uuidv4()} />
            </SellerContainer>
            <CartSeller
              key={uuidv4()}
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

export default NewCartList;
