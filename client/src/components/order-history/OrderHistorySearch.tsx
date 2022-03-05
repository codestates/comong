import React, { useState } from 'react';
import styled from 'styled-components';
import { getOrders } from '../../apis/api/order';
import { useAppSelector } from '../../redux/configStore.hooks';
import ButtonBasic from '../common/button/ButtonBasic';
import { IOrderData } from './OrderHistory';

const Wrapper = styled.div`
  height: 60px;
  margin: 40px 0;
  background-color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

interface IOrderHistorySearch {
  setOrderData: React.Dispatch<React.SetStateAction<IOrderData[] | []>>;
}

function OrderHistorySearch({ setOrderData }: IOrderHistorySearch) {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [searchForm, setSearchForm] = useState({ user_id: userinfo?.id! });

  const fillSearchForm = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const searchOrderHistoryList = async () => {
    try {
      const data = await getOrders(searchForm);
      setOrderData(data!);
    } catch (error) {}
  };

  return (
    <Wrapper>
      <select name="shipping_status" onChange={fillSearchForm}>
        <option value="">전체</option>
        <option value="processing">결제 확인 중</option>
        <option value="processing">배송 대기 중</option>
        <option value="intransit">배송 중</option>
        <option value="delivered">배송 완료</option>
      </select>
      <input name="start" type="date" onChange={fillSearchForm} />
      <span>~</span>
      <input name="end" type="date" onChange={fillSearchForm} />
      <ButtonBasic
        type="extraSmall"
        buttonClickHandler={searchOrderHistoryList}
      >
        조회
      </ButtonBasic>
    </Wrapper>
  );
}

export default OrderHistorySearch;
