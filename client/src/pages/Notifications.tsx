import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { socket } from '../App';
import NotificationListItem from '../components/notifications/NotificationListItem';
import { useAppSelector } from '../redux/configStore.hooks';
import { addNotification } from '../redux/modules/userSlice';
import useNotification from './useNotification';

const Wrapper = styled.div``;
const NotificationList = styled.ul`
  background-color: ${(props) => props.theme.colors.greyForMenu};
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
  const [notiOptions, setNotiOptions] = useState({});
  const pushNotification = useNotification('코몽', notiOptions);

  useEffect(() => {
    console.log(socket.connected);
    socket.on('notificationToClient', (data) => {
      console.log(data);
      const payStatus = data.data.status;
      const shippingStatus = data.data.shipping_status;
      const options = {
        image: `${data.itemInfo[0].image_src}`,
        timestamp: Math.floor(Date.now()),
      };
      if (payStatus === 'paid') {
        if (!shippingStatus) {
          console.log('알림 - 결제까지');
          setNotiOptions({
            ...options,
            body: `[구매 알림] 배송을 준비해주세요\n${data.itemInfo[0].title}`,
          });
        } else if (shippingStatus === 'processing') {
          console.log('알림 - 배송준비');
          setNotiOptions({
            ...options,
            body: `상품 준비중입니다\n${data.itemInfo[0].title}`,
          });
        } else if (shippingStatus === 'intransit') {
          console.log('알림 - 배송시작');
          setNotiOptions({
            ...options,
            body: `배송이 시작되었습니다\n${data.itemInfo[0].title}`,
          });
        }
        const today = new Date();
        const month =
          today.getMonth() < 10 ? `0${today.getMonth()}` : today.getMonth();
        const date =
          today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
        const newData = {
          ...data,
          read: false,
          updatedAt: `${today.getFullYear()}-${month}-${date}T`,
        };
        setMessageList((list) => list && [newData, ...list]);
        dispatch(addNotification(data));
      }
    });
  }, []);

  useEffect(() => {
    const isEmpty = Object.keys(notiOptions).length === 0 ? true : false;
    !isEmpty && pushNotification && pushNotification();
  }, [notiOptions]);

  return (
    <Wrapper>
      <h2>알림</h2>
      <NotificationList>
        {messageList && messageList.length > 0 ? (
          messageList?.map((el) => {
            const type = el.data.shipping_status || 'paid';
            return (
              <NotificationListItem
                type={type}
                info={el}
              ></NotificationListItem>
            );
          })
        ) : (
          <span>알림이 없어요!</span>
        )}
      </NotificationList>
    </Wrapper>
  );
}

export default Notifications;
