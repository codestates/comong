import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Notifications from '../../pages/Notifications';
import { useAppSelector } from '../../redux/configStore.hooks';

const Wrapper = styled.div`
  width: 18rem;
  height: 30rem;
  padding: 0.5rem 1rem;
  background-color: white;
  position: absolute;
  top: 60px;
  border: 2px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 0.5rem;

  > p {
    text-align: right;
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
  const { isLogin, role } = useAppSelector((state) => state.userSlice);
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
    </Wrapper>
  );
}

export default DropdownNotifications;
