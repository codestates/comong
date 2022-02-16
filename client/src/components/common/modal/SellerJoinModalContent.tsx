import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonBasic from '../ButtonBasic';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  height: 30%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }

  p {
    margin-bottom: 0.8rem;
  }
`;

interface ISellerJoinModalContent {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function SellerJoinModalContent({ setShowModal }: ISellerJoinModalContent) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Text>
        <p>신청이 완료되었습니다.</p> <p>메일함을 확인해주세요.</p>
      </Text>
      <ButtonBasic
        type="small"
        buttonClickHandler={(e) => {
          setShowModal(false);
          navigate('/');
        }}
      >
        확인
      </ButtonBasic>
    </Wrapper>
  );
}

export default SellerJoinModalContent;
