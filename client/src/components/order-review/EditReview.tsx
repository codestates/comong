import React from 'react';
import styled from 'styled-components';
import ButtonBasic from '../common/button/ButtonBasic';

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 10px 0;
  background-color: ${(props) => props.theme.colors.accentColorLight};
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ReviewWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: violet;
`;

const StarRate = styled.div`
  width: 100px;
  height: 30px;
  background-color: red;
`;

const ReviewText = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  background-color: azure;
`;

const Photo = styled.div`
  width: 120px;
  height: 120px;
  background-color: pink;
`;

interface IEditReview {
  showEdit: boolean;
}

function EditReview({ showEdit }: IEditReview) {
  return (
    <Wrapper className={showEdit ? 'show' : 'hide'}>
      <ReviewWrapper>
        <StarRate></StarRate>
        <ReviewText></ReviewText>
      </ReviewWrapper>
      <ButtonWrapper>
        <Photo></Photo>
        <ButtonBasic type="extraSmall" buttonClickHandler={() => {}}>
          등록
        </ButtonBasic>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default EditReview;
