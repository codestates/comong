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
}

function NotificationListItem({ info }: INotificationListItem) {
  console.log(info);
  return (
    <>
      {/* <Wrapper>
        <img src="/img/image.png" />
        <div>
          <span className="noti-item">무슨무슨 상품</span>
          <span className="noti-message">배송이 시작되었습니다</span>
          <span className="noti-store">by 무슨 상점</span>
        </div>
      </Wrapper> */}
      <Wrapper>
        <img src="/img/image.png" />
        <div>
          <span className="noti-item">무슨무슨 상품</span>
          <span className="noti-message">[구매 알림] 배송을 준비해주세요</span>
        </div>
      </Wrapper>
    </>
  );
}

export default NotificationListItem;
