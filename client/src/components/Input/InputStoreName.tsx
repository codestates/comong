import React, { useState } from 'react';
import InputBasic from './InputBasic';
import { InputNameProps } from './InputName';

function InputStoreName({ fillJoinForm }: InputNameProps) {
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
      name="storeName"
      type="text"
      title="* 스토어 이름"
      placeholder="코몽 상점"
      fillJoinForm={fillNameInput}
      message={message}
    ></InputBasic>
  );
}

export default InputStoreName;
