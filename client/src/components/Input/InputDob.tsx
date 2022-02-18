import React from 'react';
import styled from 'styled-components';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import { IAdditionalInfo } from '../form/AdditionalInfo';

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.span`
  width: 20%;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

// const RadioBtnListWrapper = styled.div`
//   width: 35%;
//   display: flex;
//   justify-content: space-between;
//   font-size: 14px;
// `;

interface IInputDob {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputDob({ fillJoinForm }: IInputDob) {
  const fillGenderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    fillJoinForm({ [name]: value });
  };

  return (
    <Wrapper>
      <Title>생년월일</Title>
      <input type="date" name="dob" onChange={fillGenderInput} />
    </Wrapper>
  );
}

export default InputDob;
