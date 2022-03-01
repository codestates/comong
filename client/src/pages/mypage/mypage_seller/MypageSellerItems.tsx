import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOrders, getOrdersSeller } from '../../../apis/api/order';
import SellerItemListItem from '../../../components/seller-item/SellerItemListItem';
import { useAppSelector } from '../../../redux/configStore.hooks';

const SellerItemList = styled.ul`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoData = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 10px;
  font-size: 20px;
`;

function MypageSellerItems() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    getOrdersById();
  }, []);

  const getOrdersById = async () => {
    try {
      const data = await getOrdersSeller({ user_id: userinfo?.id! });
      console.log(data);
    } catch (error) {}
  };

  const makeOrderHistoryListItem = () => {
    return <SellerItemListItem></SellerItemListItem>;
    // if (orderData?.length === 0) {
    //   return <NoData>등록한 상품이 없습니다</NoData>;
    // }
    // return orderData?.map((order) => {
    //   return <SellerItemListItem></SellerItemListItem>;
    // });
  };

  return (
    <>
      <h2>등록한 상품</h2>
      <SellerItemList>{makeOrderHistoryListItem()}</SellerItemList>
    </>
  );
}

export default MypageSellerItems;
