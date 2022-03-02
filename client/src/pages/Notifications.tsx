import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../App';
import NotificationListItem from '../components/notifications/NotificationListItem';
import { useAppSelector } from '../redux/configStore.hooks';

const Wrapper = styled.div`
  background-color: pink;
`;
const NotificationList = styled.ul`
  background-color: orange;
  margin-top: 20px;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

function Notifications() {
  const { userinfo, notification } = useAppSelector((state) => state.userSlice);
  const [messageList, setMessageList] = useState(notification);

  useEffect(() => {
    console.log(socket.connected);
    socket.on('joinedRoom', (data) => {
      console.log('이거는 찍히는데', data);
    });
  }, []);

  console.log(messageList);

  return (
    <Wrapper>
      <h2>알림</h2>
      <NotificationList>
        {messageList?.map((el) => {
          return <NotificationListItem></NotificationListItem>;
        })}
      </NotificationList>
    </Wrapper>
  );
}

export default Notifications;
