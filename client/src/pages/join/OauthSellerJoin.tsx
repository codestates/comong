import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiClient } from '../../apis';
// import { patchUsers } from '../../apis/api/users';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import OauthBasicInfo, {
  IOauthBasicInfo,
} from '../../components/form/OauthBasicInfo';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { patchUsersAsync } from '../../redux/modules/userSlice';
import { IJoinPartial } from './GeneralJoin';

function OauthSellerJoin() {
  const email = useOutletContext<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setJoinForm({ ...joinForm, ...{ email } });
  }, [email]);

  const [joinForm, setJoinForm] = useState({
    name: '',
    password: '',
    phone: '',
    gender: 1,
    address1: '',
    address2: '',
    dob: '',
    role: 1,
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
      <ButtonBasic buttonClickHandler={submitPatchForm}>
        회원가입 신청
      </ButtonBasic>
    </>
  );
}

export default OauthSellerJoin;
