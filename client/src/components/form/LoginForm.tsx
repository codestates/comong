import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configStore.hooks';
import { postSigninAsync } from '../../redux/modules/userSlice';
import ButtonBasic from '../common/ButtonBasic';
import { Input } from '../Input/InputBasic';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fillLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const submitLoginForm = (form: ILoginForm) => {
    dispatch(postSigninAsync(form));
    navigate('/');
    // TODO! 로그인 실패, 로딩중에 대한 표시 해야함
  };

  return (
    <FormWrapper>
      <Input name="email" onChange={fillLoginForm}></Input>
      <Input name="password" onChange={fillLoginForm}></Input>
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
