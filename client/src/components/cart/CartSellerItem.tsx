import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getCartAsync } from '../../redux/modules/cartSlice';
import type { RootState } from '../../redux/configStore';
import { increment, decrement } from '../../redux/modules/cartSlice';
import { setTotalPrice } from '../../redux/modules/cartSlice';
import { deleteItem } from '../../redux/modules/cartSlice';
import { deleteCartAsync } from '../../redux/modules/cartSlice';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 22px 0px;
`;

const CartListItemImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* flex-direction: column; */
  width: 70px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-direction: row; */
  justify-content: center;
`;

const CheckBox = styled.input`
  width: 20px;
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

const PriceContainer = styled.div`
  display: flex;
  /* display: flex; */
  align-items: center;
  /* justify-content: center; */
  /* width: 25px; */
  font-size: 10px;
  width: 15%;
`;

const CartListItemPrice = styled.div`
  justify-content: flex-end;
  align-items: flex-end;
  vertical-align: middle;
  text-align: right;
  /* width: 20%; */
  font-size: 18px;
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

const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  width: 25px;
`;

const DeleteBtnImg = styled.img`
  width: 100%;
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

  const deleteHandler = () => {
    // console.log(cartData.cartSlice.data);
    console.log(cartData.cartSlice.data[0]);
    dispatch(deleteItem([id, groupName]));
    dispatch(deleteCartAsync(id));
  };

  return (
    <Container>
      <CartListItemImageContainer>
        {/* <CheckBoxContainer>
          <CheckBox type="checkbox"></CheckBox>
        </CheckBoxContainer> */}
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
      <PriceContainer>
        <CartListItemPrice>
          {(price * stock).toLocaleString('en')}원
        </CartListItemPrice>
      </PriceContainer>
      <DeleteBtn onClick={deleteHandler}>
        <DeleteBtnImg src="/icons/cart/delete.png"></DeleteBtnImg>
      </DeleteBtn>
    </Container>
  );
};

export default CartSellerItem;
