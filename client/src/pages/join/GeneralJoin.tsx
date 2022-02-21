import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUsers, patchUsers, postUsers } from '../../apis/api/users';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import AdditionalInfo from '../../components/form/AdditionalInfo';
import BasicInfo from '../../components/form/BasicInfo';
import ErrorMessage from '../../components/Input/ErrorMessage';
import InputAdress from '../../components/Input/InputAdress';
import { useAppSelector } from '../../redux/configStore.hooks';

const Form = styled.form`
  &.mypage {
    width: 420px;
  }
`;

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
  likes: number[];
}

export type IJoinPartial = Partial<IJoinForm>;

function GeneralJoin() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [joinForm, setJoinForm] = useState<IJoinForm>({
    name: userinfo?.name || '',
    email: userinfo?.email || '',
    password: '',
    phone: userinfo?.mobile || '',
    gender: userinfo?.gender || 0,
    address1: '',
    address2: '',
    dob: '',
    role: 0,
    likes: [],
  });
  const [message, setMessage] = useState('');
  const { pathname } = useLocation();
  const isMypage = pathname.includes('mypage');
  const navigate = useNavigate();

  const fillJoinForm = (obj: IJoinPartial) => {
    setJoinForm({ ...joinForm, ...obj });
  };

  const checkRequiredForm = (form: IJoinForm) => {
    if (form.name && form.email && form.password) {
      return true;
    }
    setMessage('작성 내용을 확인해주세요');
    return false;
  };

  const submitJoinForm = async () => {
    console.log(joinForm);
    if (!checkRequiredForm(joinForm)) return;
    setMessage('');

    const response = await postUsers(joinForm);
    if (response.status === 201) {
      navigate('/');
    } else {
      // 실패 이유 모달창
      alert('오류가 발생했습니다');
    }
  };

  const submitPatchForm = async () => {
    console.log(joinForm);
    if (!checkRequiredForm(joinForm)) return;
    setMessage('');

    const response = await patchUsers(joinForm);
    if (response.statusCode === 200) {
      // 수정되었다는 모달창 띄우고
      navigate('/');
    } else {
      console.log(response);
    }
  };

  return (
    <Form className={pathname.includes('mypage') ? 'mypage' : ''}>
      <BasicInfo fillJoinForm={fillJoinForm}></BasicInfo>
      <InputAdress></InputAdress>
      <AdditionalInfo fillJoinForm={fillJoinForm}></AdditionalInfo>
      <ErrorMessage>{message}</ErrorMessage>
      <ButtonBasic
        buttonClickHandler={(e) => {
          e.preventDefault();
          isMypage ? submitPatchForm() : submitJoinForm();
        }}
      >
        {isMypage ? '정보 수정' : '회원가입'}
      </ButtonBasic>
    </Form>
  );
}

export default GeneralJoin;
