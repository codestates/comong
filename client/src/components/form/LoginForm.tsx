import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setClientHeadersToken } from '../../apis';
import { socket } from '../../App';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { postSigninAsync } from '../../redux/modules/userSlice';
import ButtonBasic from '../common/button/ButtonBasic';
import ErrorMessage from '../Input/ErrorMessage';
import { Input } from '../Input/InputBasic';

const FormWrapper = styled.form`
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  div.wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export interface ILoginForm {
  email: string;
  password: string;
}

function LoginForm() {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const fillLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const joinRoom = async (room: string) => {
    socket.emit('join_room', room);
    socket.on('notificationToClient', (data) => {
      console.log('이벤트 발생 시', data);
    });
  };

  const submitLoginForm = async (form: ILoginForm) => {
    //여기는 1이 수행되거나 실패됨에 따라 리액트에서 핸들링 하려고 만든 곳
    // .unwrap()을 붙이는 이유는 저것을 안 붙이면 createAsyncThunk가 무조건, 항상, 이행된 프로미스를 반환하기 때문.
    try {
      const response = await dispatch(postSigninAsync(form)).unwrap();
      const room = `${response.user.id}#appNotice`;
      joinRoom(room!);
      setClientHeadersToken(response.accessToken);
      navigate('/');
    } catch (error) {
      setMessage('아이디 혹은 비밀번호를 확인해 주세요');
      console.log('에렁', error);
    }
  };

  return (
    <FormWrapper>
      <div className="wrapper">
        <Input
          name="email"
          placeholder="이메일"
          onChange={fillLoginForm}
        ></Input>
        <Input
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={fillLoginForm}
        ></Input>
        <ErrorMessage>{message}</ErrorMessage>
      </div>
      <ButtonBasic
        buttonClickHandler={(e) => {
          e.preventDefault();
          submitLoginForm(loginForm);
        }}
      >
        로그인
      </ButtonBasic>
    </FormWrapper>
  );
}

export default LoginForm;
