import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import { useAppSelector } from '../../redux/configStore.hooks';

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  width: 20%;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const RadioBtnListWrapper = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const RadioBtnWrapper = styled.div`
  display: flex;

  input {
    padding: 0;
    margin: 0;
    margin-right: 4px;
    display: table-cell;
    vertical-align: middle;
  }
`;

interface IInputGender {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputGender({ fillJoinForm }: IInputGender) {
  const { userinfo } = useAppSelector((state) => state.userSlice);

  const fillGenderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    fillJoinForm({ [name]: Number(value) });
  };

  return (
    <Wrapper>
      <Title>성별</Title>
      <RadioBtnListWrapper>
        <RadioBtnWrapper>
          <input
            type="radio"
            id="man"
            name="gender"
            value="1"
            onChange={fillGenderInput}
            defaultChecked={userinfo?.gender === 1 && true}
          />
          <label htmlFor="man">남성</label>
        </RadioBtnWrapper>
        <RadioBtnWrapper>
          <input
            type="radio"
            id="woman"
            name="gender"
            value="2"
            onChange={fillGenderInput}
            defaultChecked={userinfo?.gender === 2 && true}
          />
          <label htmlFor="woman">여성</label>
        </RadioBtnWrapper>
      </RadioBtnListWrapper>
    </Wrapper>
  );
}

export default InputGender;
