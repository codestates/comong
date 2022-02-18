import React, { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import InputBasic from '../Input/InputBasic';
import InputDob from '../Input/InputDob';
import InputGender from '../Input/InputGender';
import InputLikes from '../Input/InputLikes';
import { TitleWrapper } from './BasicInfo';

const AdditionalInfoWrapper = styled.div`
  margin: 40px 0;
`;

export interface IAdditionalInfo {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function AdditionalInfo({ fillJoinForm }: IAdditionalInfo) {
  return (
    <AdditionalInfoWrapper>
      <TitleWrapper>
        <h2>추가 정보</h2>
      </TitleWrapper>
      <InputGender fillJoinForm={fillJoinForm}></InputGender>
      <InputDob fillJoinForm={fillJoinForm}></InputDob>
      <InputLikes fillJoinForm={fillJoinForm}></InputLikes>
    </AdditionalInfoWrapper>
  );
}

export default AdditionalInfo;
