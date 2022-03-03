import React from 'react';
import styled from 'styled-components';
import { INotification } from '../../redux/modules/userSlice';

const Wrapper = styled.li`
  background-color: white;
  width: 100%;
  padding: 1rem 2rem;
  border: 1px solid ${(props) => props.theme.colors.whiteForShadow};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 2rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.bgColor};
    cursor: pointer;
  }

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
`;

interface INotificationListItem {
  info: INotification;
  type: string;
}

function NotificationListItem({ info, type }: INotificationListItem) {
  console.log(type);
  console.log(info);
  console.log(info.data);
  const showNotificationByType: { [key: string]: string } = {
    paid: '[구매 알림] 배송을 준비해주세요',
    processing: '배송 준비중입니다.',
    intransit: '배송이 시작되었습니다.',
  };
  return (
    <Wrapper>
      <img src={info.itemInfo[0].image_src} />
      <div>
        <span className="noti-item">{info.itemInfo[0].title}</span>
        <span className="noti-message">{showNotificationByType[type]}</span>
        <span className="noti-date">
          {info.updatedAt ? info.updatedAt : info.data.updatedAt}
        </span>
      </div>
    </Wrapper>
  );
}

export default NotificationListItem;
