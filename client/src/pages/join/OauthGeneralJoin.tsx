import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { postOauthGoogle } from '../../apis/api/oauth';
import ButtonBasic from '../../components/common/ButtonBasic';
import OauthAdditionalInfo from '../../components/form/OauthAdditionalInfo';
import OauthBasicInfo from '../../components/form/OauthBasicInfo';

function OauthGeneralJoin() {
  // const { search } = useLocation();
  // const authorizationCode = search.split('=')[1];
  // console.log('search', search);
  // console.log(authorizationCode);

  useEffect(() => {
    let url = new URL(window.location.href);
    let authorizationCode = url.searchParams.get('code');
    postOauthGoogle(authorizationCode!);
  }, []);

  return (
    <>
      <OauthBasicInfo></OauthBasicInfo>
      <OauthAdditionalInfo></OauthAdditionalInfo>
      <ButtonBasic buttonClickHandler={() => {}}>회원가입</ButtonBasic>
    </>
  );
}

export default OauthGeneralJoin;
