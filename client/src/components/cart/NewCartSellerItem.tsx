import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getCartAsync } from '../../redux/modules/cartSlice';
import type { RootState } from '../../redux/configStore';
import { increment, decrement } from '../../redux/modules/cartSlice';
import { setTotalPrice } from '../../redux/modules/cartSlice';
import { deleteItem } from '../../redux/modules/cartSlice';
import { deleteCartAsync } from '../../redux/modules/cartSlice';
import { config } from '../../config/config';
import { apiClient } from '../../apis';

const env = 'development';
const urlConfig = config[env];

const NewCartSellerItem = ({ data, storeName, groupName }: any) => {
  const cartData = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  let userId = cartData.userSlice.userinfo?.id;
  let id = data.id;
  let name = data.item.title;
  let img_src = data.item.image_src
    ? data.item.image_src.split(',')[0]
    : 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';
  let stock = data.order_amount;
  let price = data.peritem_price;

  const stockHandler = (el: string) => {
    if (el === 'minus') {
      dispatch(decrement([id, storeName, groupName]));
    } else if (el === 'plus') {
      dispatch(increment([id, storeName, groupName]));
    }
    console.log('stock', stock);

    // let tmpObj: {
    //   user_id?: number;
    //   item_id: number;
    //   order_amount: number;
    //   status: string;
    //   peritem_price: number;
    // } = {
    //   user_id: userId,
    //   item_id: id,
    //   order_amount: stock,
    //   status: 'pending',
    //   peritem_price: price,
    // };

    console.log('userId', userId, 'id', id, 'stock', stock, 'price', price);
    let tmpObj: {
      user_id?: number;
      item_id: number;
      order_amount: number;
      status: string;
      peritem_price: number;
    } = {
      user_id: 213,
      item_id: 3436,
      order_amount: 7,
      peritem_price: 3900,
      status: 'pending',
    };
    let response = apiClient
      .post(`${urlConfig.url}/orders/orderdetail`, tmpObj)
      .then((res) => {
        console.log('res.data', res.data);
      });
    // console.log('response in New', response.data);
    dispatch(setTotalPrice(cartData.cartSlice.subTotalPrice));
  };

  const deleteHandler = async () => {
    await dispatch(deleteItem([id, groupName]));
    await dispatch(deleteCartAsync(id));
    await dispatch(getCartAsync(userId));
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
  width: 70px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 50px;
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 30%;
  }
`;
const CartListItemName = styled.div`
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  width: 25%;
`;

const CartListItemPrice = styled.div`
  justify-content: flex-end;
  align-items: flex-end;
  vertical-align: middle;
  text-align: right;
  font-size: 18px;
  font-weight: 600;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
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
  justify-content: center;
  width: 25px;
  height: 25px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const StockAddIcon = styled.img`
  width: 10px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 8px;
    height: 8px;
  }
`;
const StockDisplay = styled.div`
  width: 30px;
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.charcol};
  margin: auto;
  margin-left: 3px;
  margin-right: 3px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const StockMinusButton = styled.button`
  border: 2px solid grey;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const StockMinusIcon = styled.img`
  width: 10px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 8px;
    height: 8px;
  }
`;

const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  width: 21px;
`;

const DeleteBtnImg = styled.img`
  width: 100%;
`;

export default NewCartSellerItem;
