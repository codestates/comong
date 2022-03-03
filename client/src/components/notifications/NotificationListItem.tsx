import React from 'react';
import styled from 'styled-components';
import { Inotification } from '../../redux/modules/userSlice';

const Wrapper = styled.li`
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

interface INotificationListItem {
  info: Inotification;
  type: string;
}

function NotificationListItem({ info, type }: INotificationListItem) {
  console.log(info);
  console.log(type);
  const showNotificationByType: { [key: string]: JSX.Element } = {
    paid: <span className="noti-message">[구매 알림] 배송을 준비해주세요</span>,
    processing: <span className="noti-message">배송 준비중입니다.</span>,
    intransit: <span className="noti-message">배송이 시작되었습니다.</span>,
  };
  return (
    <>
      <Wrapper>
        <img src={info.itemInfo[0].image_src} />
        <div>
          <span className="noti-item">{info.itemInfo[0].title}</span>
          {showNotificationByType[type]}
        </div>
      </Wrapper>
    </>
  );
}

export default NotificationListItem;
