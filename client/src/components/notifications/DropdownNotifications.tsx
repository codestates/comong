import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Notifications from '../../pages/Notifications';
import { useAppSelector } from '../../redux/configStore.hooks';
import DropdownNotificationListItem from './DropdownNotificationListItem';
import NotificationListItem from './NotificationListItem';

const Wrapper = styled.div`
  width: 18rem;
  height: 30rem;
  background-color: white;
  position: absolute;
  top: 60px;
  border: 2px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 0.5rem;
  overflow-y: scroll;

  > p {
    text-align: right;
    margin: 0.4rem 0;
    :hover {
      color: ${(props) => props.theme.colors.accentColor};
      cursor: pointer;
    }
  }
`;

interface IDropdownNotifications {
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}
function DropdownNotifications({
  setShowNotifications,
}: IDropdownNotifications) {
  const { isLogin, role, notification } = useAppSelector(
    (state) => state.userSlice,
  );
  const navigate = useNavigate();
  return (
    <Wrapper>
      <p
        onClick={() => {
          role === 0
            ? navigate('/mypage/notifications')
            : navigate('/sellerpage/notifications');
          setShowNotifications(false);
        }}
      >
        더보기
      </p>
      {notification && notification.length > 0 ? (
        notification?.map((el, idx) => {
          const type = el.data.shipping_status || 'paid';
          return (
            <DropdownNotificationListItem
              type={type}
              info={el}
              idx={idx}
            ></DropdownNotificationListItem>
          );
        })
      ) : (
        <span>알림이 없어요!</span>
      )}
    </Wrapper>
  );
}

export default DropdownNotifications;
