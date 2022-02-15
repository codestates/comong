import React, { useEffect, useState } from 'react';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import InputBasic from './InputBasic';

interface InputEmailProps {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputPassword({ fillJoinForm }: InputEmailProps) {
  const [pwMessage, setPwMessage] = useState('');
  const [rePwMessage, setRePwMessage] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');

  useEffect(() => {
    fillPasswordJoinForm();
  }, [password, rePassword]);

  const fillPasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isPasswordValid = passwordValidCheck(value);
    if (isPasswordValid) {
      setPwMessage('');
    } else {
      setPwMessage('숫자, 영문, 특수문자 조합으로 8자리 이상 입력해주세요');
    }
    setPassword(value);
  };

  const fillRePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setrePassword(e.currentTarget.value);
  };

  const fillPasswordJoinForm = () => {
    const isRePasswordValid = rePasswordValidCheck(rePassword);
    if (isRePasswordValid) {
      setRePwMessage('');
      passwordValidCheck(password) && fillJoinForm({ password: rePassword });
    } else {
      setRePwMessage('비밀번호가 일치하지 않습니다');
      fillJoinForm({ password: '' });
    }
  };

  const passwordValidCheck = (pw: string) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return regExp.test(pw);
  };

  const rePasswordValidCheck = (rePw: string) => {
    if (rePw === password) return true;
    return false;
  };

  return (
    <>
      <InputBasic
        name="password"
        type="password"
        title="* 비밀번호"
        placeholder="********"
        fillJoinForm={fillPasswordInput}
        message={pwMessage}
      ></InputBasic>
      <InputBasic
        name="password"
        type="password"
        title="* 비밀번호 확인"
        placeholder="********"
        message={rePwMessage}
        fillJoinForm={fillRePasswordInput}
      ></InputBasic>
    </>
  );
}

export default InputPassword;
