import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { IJoinForm, IJoinPartial } from '../../pages/join/GeneralJoin';
import InputAdress from '../Input/InputAdress';
import InputEmail from '../Input/InputEmail';
import InputName from '../Input/InputName';
import InputPassword from '../Input/InputPassword';
import InputPhoneNum from '../Input/InputPhoneNum';

const TitleWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 28px;
  margin-right: 1rem;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 14px;
`;

interface IBasicInfo {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function BasicInfo({ fillJoinForm }: IBasicInfo) {
  return (
    <div>
      <TitleWrapper>
        <Title>기본정보</Title>
        <Span>(*)는 필수 입력 사항입니다.</Span>
      </TitleWrapper>
      <InputName fillJoinForm={fillJoinForm}></InputName>
      <InputEmail fillJoinForm={fillJoinForm}></InputEmail>
      <InputPassword fillJoinForm={fillJoinForm}></InputPassword>
      <InputPhoneNum fillJoinForm={fillJoinForm}></InputPhoneNum>
      <InputAdress></InputAdress>
    </div>
  );
}

export default BasicInfo;
