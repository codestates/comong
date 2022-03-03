import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { socket } from '../App';
import NotificationListItem from '../components/notifications/NotificationListItem';
import { useAppSelector } from '../redux/configStore.hooks';
import { addNotification } from '../redux/modules/userSlice';

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
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState(notification);

  useEffect(() => {
    console.log(socket.connected);
    socket.on('notificationToClient', (data) => {
      console.log(data);
      // 구매 했을 때 - 구매 알림
      if (data.status === 'paid' && data.shipping_status === 'pending') {
        setMessageList((list) => list && [...list, data]);
        dispatch(addNotification(data));
      }
      // 구매 승인 눌렀을 때 - 배송 준비 알림
      // 송장 입력 했을 때 - 배송 시작 알림
    });
  }, []);

  console.log(messageList);

  return (
    <Wrapper>
      <h2>알림</h2>
      <NotificationList>
        {messageList?.map((el) => {
          return (
            <NotificationListItem
              key={`noti#${el.user_id}#${el.id}`}
              info={el}
            ></NotificationListItem>
          );
        })}
      </NotificationList>
    </Wrapper>
  );
}

export default Notifications;
