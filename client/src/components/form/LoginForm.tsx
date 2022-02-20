import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { postSigninAsync } from '../../redux/modules/userSlice';
import ButtonBasic from '../common/button/ButtonBasic';
import ErrorMessage from '../Input/ErrorMessage';
import { Input } from '../Input/InputBasic';

const FormWrapper = styled.form`
  margin: 10px 0 30px 0;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media only screen and (max-width: 768px) {
    margin-bottom: 10px;
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

  const submitLoginForm = async (form: ILoginForm) => {
    try {
      await dispatch(postSigninAsync(form));
      navigate('/');
    } catch (error) {
      // !로그인 실패 알리기
      setMessage('아이디 혹은 비밀번호를 확인해 주세요');
      console.log('에렁', error);
    }
  };

  return (
    <FormWrapper>
      <Input name="email" placeholder="이메일" onChange={fillLoginForm}></Input>
      <Input
        name="password"
        placeholder="비밀번호"
        onChange={fillLoginForm}
      ></Input>
      <ErrorMessage>{message}</ErrorMessage>
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
