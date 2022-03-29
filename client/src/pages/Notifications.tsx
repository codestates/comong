import styled from 'styled-components';
import NotificationListItem from '../components/notifications/NotificationListItem';
import { useAppSelector } from '../redux/configStore.hooks';

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
  @media only screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

function Notifications() {
  const { notification } = useAppSelector((state) => state.userSlice);

  return (
    <Wrapper>
      <h2>알림</h2>
      <NotificationList>
        {notification && notification.length > 0 ? (
          notification?.map((el, idx) => {
            const type = el.data.shipping_status || 'paid';
            return (
              <NotificationListItem
                type={type}
                info={el}
                idx={idx}
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
