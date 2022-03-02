import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
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
const NotificationListItem = styled.li`
  background-color: aliceblue;
  width: 100%;
  padding: 1rem 2rem;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 2rem;

  img {
    width: 60px;
    height: 60px;
  }

  > div {
    width: 80%;
    display: flex;
    flex-direction: column;

    span.noti-item {
      color: ${(props) => props.theme.colors.darkGrey};
    }
    span.noti-message {
      font-size: 18px;
      font-weight: 700;
    }
    span.noti-store {
      text-align: end;
    }
  }
`;

interface ServerToClientEvents {
  notificationToClient: (data: any) => void;
}

interface ClientToServerEvents {
  join_room: (room: string) => void;
  notificationToServer: (data: any) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'https://localhost:443/app',
);

export const sendMessage = async (messageData: string) => {
  await socket.emit('notificationToServer', messageData);
};

function Notifications() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const room = userinfo && `${userinfo.id}#appNotice`;
  const [messageList, setMessageList] = useState<any>([]);

  useEffect(() => {
    joinRoom();
    socket.on('notificationToClient', (data) => {
      console.log(data);
      setMessageList((list: any) => [...list, data]);
    });
  }, []);

  const joinRoom = () => {
    socket.emit('join_room', room!);
  };

  return (
    <Wrapper>
      <h2>알림</h2>
      <NotificationList>
        <NotificationListItem>
          <img src="/img/image.png" />
          <div>
            <span className="noti-item">무슨무슨 상품</span>
            <span className="noti-message">배송이 시작되었습니다</span>
            <span className="noti-store">by 무슨 상점</span>
          </div>
        </NotificationListItem>
        <NotificationListItem>알림입니다</NotificationListItem>
      </NotificationList>
    </Wrapper>
  );
}

export default Notifications;
