import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setClientHeadersToken } from '../../../apis';
import { socket } from '../../../App';
import { useAppDispatch } from '../../../redux/configStore.hooks';
import { getAddressAsync } from '../../../redux/modules/addressSlice';
import { postSigninAsync } from '../../../redux/modules/userSlice';
import ButtonBasic from '../button/ButtonBasic';

const Wrapper = styled.div`
  height: 100%;
  padding: 1.5rem 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div.close-btn {
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    right: 1rem;
    top: 1rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

interface ITestLoginModalContainer {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function TestLoginModalContainer({ setShowModal }: ITestLoginModalContainer) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = {
    general: {
      email: 'buyer@comong.kr',
      password: 'asdf1234!',
    },
    seller: {
      email: 'test1008@comong.kr',
      password: 'test1008',
    },
  };

  const joinRoom = async (room: string) => {
    socket.emit('join_room', room);
    socket.on('notificationToClient', (data) => {
      console.log('이벤트 발생 시', data);
    });
  };

  const testLogin = async (usertype: { email: string; password: string }) => {
    try {
      const response = await dispatch(postSigninAsync(usertype)).unwrap();
      const room = `${response.user.id}#appNotice`;
      joinRoom(room!);
      setClientHeadersToken(response.accessToken);
      navigate('/');
      dispatch(getAddressAsync());
    } catch (error) {}
  };

  return (
    <Wrapper>
      <div
        className="close-btn"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <img src="img/close.png" />
      </div>
      <ButtonBasic buttonClickHandler={() => testLogin(user.general)}>
        일반회원으로 시작하기
      </ButtonBasic>
      <ButtonBasic buttonClickHandler={() => testLogin(user.seller)}>
        판매회원으로 시작하기
      </ButtonBasic>
    </Wrapper>
  );
}

export default TestLoginModalContainer;
