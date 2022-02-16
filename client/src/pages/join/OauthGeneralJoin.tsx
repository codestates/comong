import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  postOauthGoogle,
  postOauthKakao,
  postOauthNaver,
} from '../../apis/api/oauth';
import ButtonBasic from '../../components/common/ButtonBasic';
import OauthAdditionalInfo from '../../components/form/OauthAdditionalInfo';
import OauthBasicInfo from '../../components/form/OauthBasicInfo';

function OauthGeneralJoin() {
  const { search } = useLocation();
  const authorizationCode = search.split('=')[1];

  useEffect(() => {
    const oauth = sessionStorage.getItem('oauth');
    if (oauth === 'naver') {
      postOauthNaver(authorizationCode);
    } else if (oauth === 'kakao') {
      postOauthKakao(authorizationCode);
    } else if (oauth === 'google') {
      postOauthGoogle(authorizationCode);
    }
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
