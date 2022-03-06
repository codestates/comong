import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configStore.hooks';

const Wrapper = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  right: -0.3rem;
  top: -0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.5rem;
  font-weight: 100;
`;

function NotificationNum() {
  const { notification } = useAppSelector((state) => state.userSlice);
  const newNotiNum = notification?.filter((noti) => noti.read === false).length;

  return <Wrapper>{newNotiNum}</Wrapper>;
}

export default NotificationNum;
