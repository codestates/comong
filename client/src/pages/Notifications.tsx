import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { socket } from '../App';
import NotificationListItem from '../components/notifications/NotificationListItem';
import { useAppSelector } from '../redux/configStore.hooks';
import { addNotification } from '../redux/modules/userSlice';

const Wrapper = styled.div``;
const NotificationList = styled.ul`
  background-color: ${(props) => props.theme.colors.lightGrey};
  height: 90vh;
  overflow: scroll;
  margin-top: 20px;
  padding: 4% 10%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

function Notifications() {
  const { userinfo, notification } = useAppSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState(notification);

  useEffect(() => {
    console.log(socket.connected);
    socket.on('notificationToClient', (data) => {
      console.log(data);
      const payStatus = data.data.status;
      const shippingStatus = data.data.shipping_status;
      if (payStatus === 'paid') {
        if (
          shippingStatus === 'pending' ||
          shippingStatus === 'processing' ||
          shippingStatus === 'intransit'
        ) {
          setMessageList((list) => list && [...list, data]);
          dispatch(addNotification(data));
        }
      }
    });
  }, []);

  return (
    <Wrapper>
      <h2>알림</h2>
      <NotificationList>
        {messageList?.map((el) => {
          const type = el.data.shipping_status;
          return (
            <NotificationListItem
              type={type === 'pending' ? 'paid' : type}
              key={`noti#${el.data.order_id}#${el.data.shipping_status}`}
              info={el}
            ></NotificationListItem>
          );
        })}
      </NotificationList>
    </Wrapper>
  );
}

export default Notifications;
