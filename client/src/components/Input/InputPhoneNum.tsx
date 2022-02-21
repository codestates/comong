import React, { useState } from 'react';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import { useAppSelector } from '../../redux/configStore.hooks';
import InputBasic from './InputBasic';

interface InputPhoneProps {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputPhoneNum({ fillJoinForm }: InputPhoneProps) {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(userinfo?.mobile || '');

  const fillPhoneNumInput = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    setValue(value);
    console.log('전번 ㅎㅎ', value);
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
    const regExp1 = /^(010)-?[0-9]{4}-?[0-9]{4}$/;
    const regExp2 = /^(02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    return regExp1.test(phone) || regExp2.test(phone);
  };

  return (
    <InputBasic
      name="phone"
      type="text"
      title="연락처"
      value={value}
      placeholder="숫자만 입력하세요"
      fillJoinForm={fillPhoneNumInput}
      message={message}
    ></InputBasic>
  );
}

export default InputPhoneNum;
