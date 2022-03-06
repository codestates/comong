import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUsers } from '../../../apis/api/users';
import ButtonBasic from '../button/ButtonBasic';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'roboto', 'Noto Sans KR';
`;

const Text = styled.div`
  height: 30%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }

  p {
    margin-bottom: 0.8rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

interface IDeleteUserModalContent {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteUserModalContent({ setShowModal }: IDeleteUserModalContent) {
  const navigate = useNavigate();
  const deleteUserHandler = async () => {
    try {
      const response = await deleteUsers();
      console.log(response);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Text>
        <p>정말 탈퇴하시겠습니까?</p>
      </Text>
      <ButtonWrapper>
        <ButtonBasic type="small" buttonClickHandler={deleteUserHandler}>
          확인
        </ButtonBasic>
        <ButtonBasic
          type="small"
          buttonClickHandler={() => {
            setShowModal(false);
          }}
        >
          취소
        </ButtonBasic>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default DeleteUserModalContent;
