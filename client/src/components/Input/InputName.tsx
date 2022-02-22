import React, { useState } from 'react';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import { useAppSelector } from '../../redux/configStore.hooks';
import InputBasic from './InputBasic';

export interface InputNameProps {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputName({ fillJoinForm }: InputNameProps) {
  const [message, setMessage] = useState('');
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [value, setValue] = useState(userinfo?.name || '');

  const fillNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValue(value);

    const isNameValid = validCheck(value);
    if (isNameValid) {
      setMessage('');
      fillJoinForm({ [name]: value });
    } else {
      setMessage('이름을 입력해주세요');
      fillJoinForm({ [name]: '' });
    }
  };

  const validCheck = (name: string) => {
    if (name.length < 1) {
      return false;
    }
    return true;
  };

  return (
    <InputBasic
      name="name"
      type="text"
      title="* 이름"
      value={value}
      placeholder="홍길동"
      fillJoinForm={fillNameInput}
      message={message}
    ></InputBasic>
  );
}

export default InputName;
