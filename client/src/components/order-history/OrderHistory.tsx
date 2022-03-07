import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOrders } from '../../apis/api/order';
import { useAppSelector } from '../../redux/configStore.hooks';
import EditReview from '../order-review/EditReview';
import OrderHistoryListItem from './OrderHistoryListItem';
import OrderHistoryListItemWrapper from './OrderHistoryListItemWrapper';
import OrderHistorySearch from './OrderHistorySearch';

const OrderHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
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

export interface IOrderSeller {
  id: number;
  storename: string;
  mobile: string;
}

export interface IOrderData {
  order_detail_info: {
    createdAt: string;
    id: number;
    item_id: number;
    order_amount: number;
    peritem_price: number;
    status: string;
    updatedAt: string;
    user_id: number;
    user: IOrderSeller;
  };
  item_info: {
    contents: string;
    createdAt: string;
    id: number;
    image_src: string;
    price: number;
    title: string;
    updatedAt: string;
    user_id: number;
  };
  shipping_status: string;
}

interface IOrderHistory {
  search?: boolean;
  orderStatusNum?: {
    [key: string]: number;
  };
  setOrderStatusNum?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: number;
    }>
  >;
}

function OrderHistory({
  search,
  orderStatusNum,
  setOrderStatusNum,
}: IOrderHistory) {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [orderData, setOrderData] = useState<IOrderData[] | []>([]);

  useEffect(() => {
    getOrdersById();
  }, []);

  const getOrdersById = async () => {
    try {
      const data = await getOrders({ user_id: userinfo?.id! });
      setOrderData(data!);
      setOrderStatusNum && countShippingStatus(data!);
    } catch (error) {}
  };

  const countShippingStatus = (data: IOrderData[]) => {
    if (!(orderStatusNum && setOrderStatusNum)) return;
    const orderStatus = { ...orderStatusNum };
    data.forEach((obj: IOrderData) => orderStatus[obj.shipping_status]++);
    setOrderStatusNum({ ...orderStatus });
  };

  const makeOrderHistoryListItem = () => {
    if (orderData?.length === 0) {
      return <NoData>주문 내역이 없습니다</NoData>;
    }
    return orderData?.map((order) => {
      return (
        <OrderHistoryListItemWrapper
          order={order}
        ></OrderHistoryListItemWrapper>
      );
    });
  };

  return (
    <div>
      {search && (
        <OrderHistorySearch setOrderData={setOrderData}></OrderHistorySearch>
      )}
      <OrderHistoryList>{makeOrderHistoryListItem()}</OrderHistoryList>
    </div>
  );
}

export default OrderHistory;
