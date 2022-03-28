import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUsers, postUsers } from '../../apis/api/users';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import ButtonLoadingIndicator from '../../components/common/loading-indicator/ButtonLoadingIndicator';
import AdditionalInfo from '../../components/form/AdditionalInfo';
import BasicInfo from '../../components/form/BasicInfo';
import ErrorMessage from '../../components/Input/ErrorMessage';
import InputAddress from '../../components/Input/InputAddress';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { getAddressAsync } from '../../redux/modules/addressSlice';
import { patchUsersAsync } from '../../redux/modules/userSlice';

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
  postal_code: string;
  address1: string;
  address2: string;
  dob: string;
  role: number;
  likes: number[];
  myimg_src?: string;
}

export type IJoinPartial = Partial<IJoinForm>;

function GeneralJoin() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const addressSlice = useAppSelector((state) => state.addressSlice);
  const [joinForm, setJoinForm] = useState<IJoinForm>({
    name: userinfo?.name || '',
    email: userinfo?.email || '',
    password: '',
    phone: userinfo?.mobile || '',
    gender: userinfo?.gender || 0,
    postal_code: addressSlice.postal_code,
    address1: addressSlice.address1,
    address2: addressSlice.address2,
    dob: userinfo?.birthday || '',
    role: 0,
    likes: userinfo?.likes || [],
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const isMypage = pathname.includes('mypage');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAddressAsync());
  }, []);

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
    setIsLoading(true);
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
    if (!checkRequiredForm(joinForm)) return;
    setIsLoading(true);
    setMessage('');

    try {
      await dispatch(patchUsersAsync(joinForm)).unwrap();
      navigate('/');
    } catch (error) {}
  };

  return (
    <Form className={pathname.includes('mypage') ? 'mypage' : ''}>
      <BasicInfo fillJoinForm={fillJoinForm}></BasicInfo>
      <InputAddress fillJoinForm={fillJoinForm}></InputAddress>
      <AdditionalInfo fillJoinForm={fillJoinForm}></AdditionalInfo>
      <ErrorMessage>{message}</ErrorMessage>
      {isLoading ? (
        <ButtonLoadingIndicator></ButtonLoadingIndicator>
      ) : (
        <ButtonBasic
          buttonClickHandler={(e) => {
            e.preventDefault();
            isMypage ? submitPatchForm() : submitJoinForm();
          }}
        >
          {isMypage ? '정보 수정' : '회원가입'}
        </ButtonBasic>
      )}
    </Form>
  );
}

export default GeneralJoin;
