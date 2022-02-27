import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOrdersSeller } from '../../../apis/api/order';
import SellerOrderStateList from '../../../components/mypage/SellerOrderStateList';
import { useAppSelector } from '../../../redux/configStore.hooks';
import { IItem } from '../mypage_user/MypageBookmarks';
import SalesHistoryTable from '../../../components/sales-history/SalesHistoryTable';

const Wrapper = styled.div`
  padding: 60px 0;
  height: 100vh;
`;

const SliceHistoryWrapper = styled.div`
  margin-top: 60px;
`;

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getOrdersSeller({ user_id: userinfo?.id! });
      setSalesList(response!);
    } catch (error) {}
  };

  return (
    <Wrapper>
      <SellerOrderStateList></SellerOrderStateList>
      <SliceHistoryWrapper>
        <h2>판매 현황</h2>
        <SalesHistoryTable salesList={salesList}></SalesHistoryTable>
      </SliceHistoryWrapper>
    </Wrapper>
  );
}

export default MypageSellerDefault;
