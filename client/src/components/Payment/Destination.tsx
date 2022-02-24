import React from 'react';
import styled from 'styled-components';

const DestinationContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 100%;
  margin-top: 10px;
  margin-right: 20px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;

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
  width: 300px;
  justify-content: space-between;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
  }
`;
const InputTitle = styled.div`
  margin: 5px 10px;
  font-size: 20px;
  @media only screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const IntputContents = styled.input`
  /* margin: 5px 10px;/ */
`;
const IntputContentsLong = styled.input`
  /* margin: 5px 10px;/ */
  /* width: 170px; */
`;

const Destination = () => {
  return (
    <DestinationContainer>
      <Title>배송지 정보</Title>
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
          <InputTitle>주소</InputTitle>
          <IntputContentsLong></IntputContentsLong>
        </InputContainerLong>
        <InputContainerLong>
          <InputTitle>배송메세지</InputTitle>
          <IntputContentsLong></IntputContentsLong>
        </InputContainerLong>
      </Contents>
    </DestinationContainer>
  );
};

export default Destination;
