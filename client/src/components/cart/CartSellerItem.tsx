import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getCartAsync } from '../../redux/modules/cartSlice';
import type { RootState } from '../../redux/configStore';
import { increment, decrement } from '../../redux/modules/cartSlice';
import { setTotalPrice } from '../../redux/modules/cartSlice';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0px;
`;

const CartListItemImageContainer = styled.div`
  width: 60px;
`;
const CartListItemImage = styled.img`
  width: 60px;
`;

const NameAndStockContainer = styled.div`
  width: 60%;
`;
const CartListItemName = styled.div`
  font-size: 15px;
  font-weight: 400;
`;
const CartListItemPrice = styled.div`
  width: 15%;
  font-size: 20px;
  font-weight: 600;
`;

const StockController = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const StockAddButton = styled.button`
  border: 2px solid grey;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
`;
const StockAddIcon = styled.img`
  width: 10px;
`;
const StockDisplay = styled.div`
  width: 30px;
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.charcol};
  margin: auto;
  margin-left: 3px;
  margin-right: 3px;
`;
const StockMinusButton = styled.button`
  border: 2px solid grey;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
`;
const StockMinusIcon = styled.img`
  width: 10px;
`;
const CartSellerItem = ({ data, storeName, groupName }: any) => {
  const cartData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  let id = data.id;
  let name = data.item.title;
  let img_src = data.item.image_src;
  let stock = data.order_amount;
  let price = data.peritem_price;

  const stockHandler = (el: string) => {
    if (el === 'minus') {
      dispatch(decrement([id, storeName, groupName]));
    } else if (el === 'plus') {
      dispatch(increment([id, storeName, groupName]));
    }
    dispatch(setTotalPrice(cartData.cartSlice.subTotalPrice));
  };

  return (
    <Container>
      <CartListItemImageContainer>
        <CartListItemImage src={img_src} />
      </CartListItemImageContainer>
      <NameAndStockContainer>
        <CartListItemName>{name}</CartListItemName>
        <StockController>
          <StockMinusButton
            onClick={() => {
              stockHandler('minus');
            }}
          >
            <StockMinusIcon src="/icons/post/minus.png" />
          </StockMinusButton>
          <StockDisplay>{stock}</StockDisplay>
          <StockAddButton
            onClick={() => {
              stockHandler('plus');
            }}
          >
            <StockAddIcon src="/icons/post/plus.png" />
          </StockAddButton>
        </StockController>
      </NameAndStockContainer>
      <CartListItemPrice>
        {(price * stock).toLocaleString('en')}원
      </CartListItemPrice>
    </Container>
  );
};

export default CartSellerItem;
