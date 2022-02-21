import React from 'react';
import styled from 'styled-components';

const DestinationContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 65%;
  position: sticky;
  margin-right: 20px;
  top: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  box-shadow: 0px 0px 12px ${(props) => props.theme.colors.whiteForShadow};
  border-radius: 5px;
  height: 2000px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Title = styled.div``;

// const Title;

const Destination = () => {
  return (
    <DestinationContainer>
      <Title>배송지 정보</Title>
      {/* <TitleLine></TitleLine> */}
    </DestinationContainer>
  );
};

export default Destination;
