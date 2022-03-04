import React from 'react';
import styled from 'styled-components';
import ItemList from './itemList/ItemList';

const DestinationContainer = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
  width: 95%;
  /* margin-top: 10px; */
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

const Title = styled.div`
  font-size: 17px;
`;

const TitleLine = styled.hr`
  margin: 15px 0px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 95%;
`;

const Destination = () => {
  return (
    <DestinationContainer>
      <Title>상품 정보</Title>
      <TitleLine></TitleLine>
      <Contents>
        <ItemList></ItemList>
      </Contents>
    </DestinationContainer>
  );
};

export default Destination;
