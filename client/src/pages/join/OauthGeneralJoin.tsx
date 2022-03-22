import React, { ContextType, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiClient } from '../../apis';
// import { patchUsers } from '../../apis/api/users';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import AdditionalInfo from '../../components/form/AdditionalInfo';
import OauthBasicInfo from '../../components/form/OauthBasicInfo';
import InputAddress from '../../components/Input/InputAddress';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { patchUsersAsync } from '../../redux/modules/userSlice';
import { IJoinPartial } from './GeneralJoin';

function OauthGeneralJoin() {
  const email = useOutletContext<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setJoinForm({ ...joinForm, ...{ email } });
  }, [email]);

  const [joinForm, setJoinForm] = useState<IJoinPartial>({
    name: '',
    password: '',
    phone: '',
    gender: 1,
    postal_code: '',
    address1: '',
    address2: '',
    dob: '',
    role: 0,
    likes: [],
  });

  const fillJoinForm = (obj: IJoinPartial) => {
    setJoinForm({ ...joinForm, ...obj });
  };

  const submitPatchForm = () => {
    console.log(joinForm);
    dispatch(patchUsersAsync(joinForm));
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <>
      <OauthBasicInfo fillJoinForm={fillJoinForm}></OauthBasicInfo>
      <InputAddress fillJoinForm={fillJoinForm}></InputAddress>
      <AdditionalInfo fillJoinForm={fillJoinForm}></AdditionalInfo>
      <ButtonBasic buttonClickHandler={submitPatchForm}>회원가입</ButtonBasic>
    </>
  );
}

export default OauthGeneralJoin;
