import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUsers } from '../../apis/api/users';
import ButtonLarge from '../../components/common/ButtonBasic';
import AdditionalInfo from '../../components/form/AdditionalInfo';
import BasicInfo from '../../components/form/BasicInfo';
import ErrorMessage from '../../components/Input/ErrorMessage';
import InputAdress from '../../components/Input/InputAdress';

export interface IJoinForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: number;
  address1: string;
  address2: string;
  dob: string;
  role: number;
}

export type IJoinPartial = Partial<IJoinForm>;

function GeneralJoin() {
  const [joinForm, setJoinForm] = useState<IJoinForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 0,
    address1: '',
    address2: '',
    dob: '',
    role: 0,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fillJoinForm = (obj: IJoinPartial) => {
    setJoinForm({ ...joinForm, ...obj });
  };

  const checkRequiredForm = (form: IJoinForm) => {
    if (form.name && form.email && form.password) {
      return true;
    }
    return false;
  };

  const submitForm = () => {
    const isFormValid = checkRequiredForm(joinForm);
    if (!isFormValid) {
      setMessage('작성 내용을 확인해주세요');
      return;
    }
    setMessage('');
    postUsers(joinForm);
    navigate('/');
  };

  return (
    <form>
      <BasicInfo fillJoinForm={fillJoinForm}></BasicInfo>
      <InputAdress></InputAdress>
      <AdditionalInfo></AdditionalInfo>
      <ErrorMessage>{message}</ErrorMessage>
      <ButtonLarge
        buttonClickHandler={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        회원가입
      </ButtonLarge>
    </form>
  );
}

export default GeneralJoin;
