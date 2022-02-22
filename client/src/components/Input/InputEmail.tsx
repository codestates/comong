import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getIsDuplicate } from '../../apis/api/users';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import ButtonBasic from '../common/button/ButtonBasic';
import ErrorMessage from './ErrorMessage';

const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Input = styled.input`
  height: 45px;
  width: 77%;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.textColor};

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const ButtonWrapper = styled.div``;

interface InputEmailProps {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputEmail({ fillJoinForm }: InputEmailProps) {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsEmailCorrect(false); // 이메일 건드리면 이메일 중복검사 체크 false로 바꾸어서 다시하게 만들어야함
    fillJoinForm({ email: '' });
  }, [email]);

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    const result = checkEmailValidation(email);
    if (!result) {
      setMessage('올바르지 않은 형식입니다.');
    } else {
      setMessage('');
    }
  };

  const checkEmailValidation = (email: string) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
  };

  const checkEmailDuplication = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!checkEmailValidation(email)) return;

    const data = await getIsDuplicate(email);

    if (!data) {
      setMessage('이미 사용중인 이메일입니다');
      return;
    } else {
      setIsEmailCorrect(true);
      setMessage('인증되었습니다');
      fillJoinForm({ email });
    }
  };

  return (
    <Wrapper>
      <Title>* 이메일</Title>
      <InputWrapper>
        <Input
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={handleEmailInput}
          required
        />
        <ButtonWrapper>
          <ButtonBasic type="small" buttonClickHandler={checkEmailDuplication}>
            중복검사
          </ButtonBasic>
        </ButtonWrapper>
      </InputWrapper>
      <ErrorMessage success={isEmailCorrect}>{message}</ErrorMessage>
    </Wrapper>
  );
}

export default InputEmail;
