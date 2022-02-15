import React, { useState } from 'react';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import InputBasic from './InputBasic';

interface InputPhoneProps {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputPhoneNum({ fillJoinForm }: InputPhoneProps) {
  const [message, setMessage] = useState('');

  const fillPhoneNumInput = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    const isPhoneNumValid = validCheck(value);
    if (isPhoneNumValid) {
      setMessage('');
      fillJoinForm({ [name]: value });
    } else {
      setMessage('유효한 번호를 입력해주세요');
      fillJoinForm({ [name]: '' });
    }
  };

  const validCheck = (phone: string) => {
    const regExp =
      /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    return regExp.test(phone);
  };

  return (
    <InputBasic
      name="phone"
      type="number"
      title="연락처"
      placeholder="숫자만 입력하세요"
      fillJoinForm={fillPhoneNumInput}
      message={message}
    ></InputBasic>
  );
}

export default InputPhoneNum;
