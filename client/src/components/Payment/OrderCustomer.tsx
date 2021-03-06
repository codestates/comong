import React from 'react';
import styled from 'styled-components';

const DestinationContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 100%;
  /* position: sticky; */
  /* margin-top: 10px; */
  margin-right: 20px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  box-shadow: 0px 0px 12px ${(props) => props.theme.colors.whiteForShadow};
  border-radius: 5px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Title = styled.div``;

const TitleLine = styled.hr`
  margin: 15px 0px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainerShort = styled.div`
  display: flex;
  margin: 20px 10px;
  width: 300px;
  justify-content: space-between;
`;
const InputContainerLong = styled.div`
  display: flex;
  margin: 20px 10px;
  width: 500px;
  justify-content: space-between;
`;
const InputTitle = styled.div`
  margin: 5px 10px;
  font-size: 20px;
`;
const IntputContents = styled.input`
  /* margin: 5px 10px;/ */
`;
const IntputContentsLong = styled.input`
  /* margin: 5px 10px;/ */
  width: 370px;
`;
const OrderCustomer = () => {
  return (
    <DestinationContainer>
      <Title>보내는 사람</Title>
      <TitleLine></TitleLine>
      <Contents>
        <InputContainerShort>
          <InputTitle>이름</InputTitle>
          <IntputContents></IntputContents>
        </InputContainerShort>
        <InputContainerShort>
          <InputTitle>연락처</InputTitle>
          <IntputContents></IntputContents>
        </InputContainerShort>
        <InputContainerLong>
          <InputTitle>이메일</InputTitle>
          <IntputContentsLong></IntputContentsLong>
        </InputContainerLong>
        <InputContainerLong>
          <InputTitle>주소</InputTitle>
          <IntputContentsLong></IntputContentsLong>
        </InputContainerLong>
      </Contents>
    </DestinationContainer>
  );
};

export default OrderCustomer;
