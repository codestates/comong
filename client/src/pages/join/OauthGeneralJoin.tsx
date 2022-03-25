import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiClient } from '../../apis';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import ButtonLoadingIndicator from '../../components/common/loading-indicator/ButtonLoadingIndicator';
import AdditionalInfo from '../../components/form/AdditionalInfo';
import OauthBasicInfo from '../../components/form/OauthBasicInfo';
import InputAddress from '../../components/Input/InputAddress';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { patchUsersAsync } from '../../redux/modules/userSlice';
import { IJoinPartial } from './GeneralJoin';

function OauthGeneralJoin() {
  const email = useOutletContext<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    setJoinForm({ ...joinForm, ...{ email } });
  }, [email]);

  const fillJoinForm = (obj: IJoinPartial) => {
    setJoinForm({ ...joinForm, ...obj });
  };

  const submitPatchForm = async () => {
    console.log(joinForm);
    setIsLoading(true);

    try {
      await dispatch(patchUsersAsync(joinForm)).unwrap();
      delete apiClient.defaults.headers.common['Authorization'];
      navigate('/');
    } catch (error) {}
  };

  return (
    <>
      <OauthBasicInfo fillJoinForm={fillJoinForm}></OauthBasicInfo>
      <InputAddress fillJoinForm={fillJoinForm}></InputAddress>
      <AdditionalInfo fillJoinForm={fillJoinForm}></AdditionalInfo>
      {isLoading ? (
        <ButtonLoadingIndicator></ButtonLoadingIndicator>
      ) : (
        <ButtonBasic buttonClickHandler={submitPatchForm}>회원가입</ButtonBasic>
      )}
    </>
  );
}

export default OauthGeneralJoin;
