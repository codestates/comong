import React, { useState } from 'react';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import InputBasic from './InputBasic';

interface InputNameProps {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputName({ fillJoinForm }: InputNameProps) {
  const [message, setMessage] = useState('');

  const fillNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
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
      placeholder="홍길동"
      fillJoinForm={fillNameInput}
      message={message}
    ></InputBasic>
  );
}

export default InputName;
