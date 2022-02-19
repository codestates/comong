import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import InputEmail from '../Input/InputEmail';
import InputName from '../Input/InputName';
import InputPassword from '../Input/InputPassword';
import InputPhoneNum from '../Input/InputPhoneNum';

export const TitleWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  h2 {
    margin-right: 1rem;
  }

  span {
    color: ${(props) => props.theme.colors.darkGrey};
    font-size: 14px;
  }
`;

interface IBasicInfo {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function BasicInfo({ fillJoinForm }: IBasicInfo) {
  const { pathname } = useLocation();
  return (
    <div>
      <TitleWrapper>
        <h2>기본정보</h2>
        <span>(*)는 필수 입력 사항입니다.</span>
      </TitleWrapper>
      <InputName fillJoinForm={fillJoinForm}></InputName>
      {!pathname.includes('mypage') && (
        <InputEmail fillJoinForm={fillJoinForm}></InputEmail>
      )}
      <InputPassword fillJoinForm={fillJoinForm}></InputPassword>
      <InputPhoneNum fillJoinForm={fillJoinForm}></InputPhoneNum>
    </div>
  );
}

export default BasicInfo;
