import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiClient } from '../../apis';
import { patchUsers } from '../../apis/api/users';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import OauthBasicInfo, {
  IOauthBasicInfo,
} from '../../components/form/OauthBasicInfo';
import { IJoinPartial } from './GeneralJoin';

function OauthSellerJoin() {
  const email = useOutletContext<string>();

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

  return (
    <>
      <OauthBasicInfo fillJoinForm={fillJoinForm}></OauthBasicInfo>
      <ButtonBasic
        buttonClickHandler={() => {
          patchUsers(joinForm);
          delete apiClient.defaults.headers.common['Authorization'];
        }}
      >
        회원가입 신청
      </ButtonBasic>
    </>
  );
}

export default OauthSellerJoin;
