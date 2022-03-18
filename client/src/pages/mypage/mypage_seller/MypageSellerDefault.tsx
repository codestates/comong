import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOrdersSeller } from '../../../apis/api/order';
import SellerOrderStateList from '../../../components/mypage/SellerOrderStateList';
import { useAppSelector } from '../../../redux/configStore.hooks';
import { IItem } from '../mypage_user/MypageBookmarks';
import SalesHistoryTable from '../../../components/sales-history/SalesHistoryTable';

const Wrapper = styled.div``;

const SliceHistoryWrapper = styled.div``;

export interface IOrderDetailInfo {
  item_info: IItem;
  order_detail_info: {
    reatedAt: string;
    id: number;
    item_id: number;
    order_amount: number;
    peritem_price: number;
    status: string;
    updatedAt: string;
    user_id: number;
    user: {
      id: number;
      sotrename: string;
      mobile: string;
    };
  };
}

export interface ISalesList {
  order_detail_info: IOrderDetailInfo[];
  order_info: {
    address_line1: string;
    address_line2: string;
    buyer_name: string;
    contact: string;
    createdAt: string;
    email: string;
    id: string;
    postal_code: string;
    shipping_code: string;
    shipping_company: string;
    shipping_status: string;
    status: string;
    total_amount: number;
    updatedAt: string;
    user_id: number;
  };
}

function MypageSellerDefault() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [salesList, setSalesList] = useState<ISalesList[]>([]);
  const [orderStatusNum, setOrderStatusNum] = useState<{
    [key: string]: number;
  }>({
    pending: 0,
    processing: 0,
    intransit: 0,
    delivered: 0,
    returned: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('hi');
      const response = await getOrdersSeller({ user_id: userinfo?.id! });
      setSalesList(response?.reverse()!);
      countShippingStatus(response!);
    } catch (error) {
      console.log(error);
    }
  };

  const countShippingStatus = (data: ISalesList[]) => {
    if (!(orderStatusNum && setOrderStatusNum)) return;
    const orderStatus = { ...orderStatusNum };
    data
      .filter((order: ISalesList) => order.order_info.status !== 'pending')
      .forEach(
        (obj: ISalesList) => orderStatus[obj.order_info.shipping_status]++,
      );
    setOrderStatusNum({ ...orderStatus });
  };

  return (
    <Wrapper>
      <SellerOrderStateList
        orderStatusNum={orderStatusNum}
      ></SellerOrderStateList>
      <SliceHistoryWrapper>
        <h2>판매 현황</h2>
        <SalesHistoryTable salesList={salesList}></SalesHistoryTable>
      </SliceHistoryWrapper>
    </Wrapper>
  );
}

export default MypageSellerDefault;
