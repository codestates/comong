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
    gap: 0.4rem;
    font-size: 14px;

    span.noti-item {
      color: ${(props) => props.theme.colors.charcol};
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span.noti-message {
      font-size: 18px;
      font-weight: 700;
    }
    span.noti-date {
      text-align: end;
      color: ${(props) => props.theme.colors.darkGrey};
    }
    }
  }
`;

interface INotificationListItem {
  key: string;
  info: Inotification;
  type: string;
}

function NotificationListItem({ key, info, type }: INotificationListItem) {
  console.log(type);
  console.log(info);
  console.log(info.data.updatedAt.split('T')[0]);
  const showNotificationByType: { [key: string]: JSX.Element } = {
    paid: <span className="noti-message">[구매 알림] 배송을 준비해주세요</span>,
    processing: <span className="noti-message">배송 준비중입니다.</span>,
    intransit: <span className="noti-message">배송이 시작되었습니다.</span>,
  };
  return (
    <>
      <Wrapper key={`${key}#li`}>
        <img src={info.itemInfo[0].image_src} />
        <div>
          <span className="noti-item">{info.itemInfo[0].title}</span>
          {showNotificationByType[type]}
          <span className="noti-date">{info.data.updatedAt}</span>
        </div>
      </Wrapper>
    </>
  );
}

export default NotificationListItem;
