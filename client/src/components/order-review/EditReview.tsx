import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  IPostCommentForm,
  IPostCommentFormPartial,
  postComments,
} from '../../apis/api/comment';
import { useAppSelector } from '../../redux/configStore.hooks';
import ButtonBasic from '../common/button/ButtonBasic';
import { IOrderData } from '../order-history/OrderHistory';
import ReviewPhoto from './ReviewPhoto';
import StarRatings from './StarRatings';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem 2rem 2rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
  }
`;

const RatingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  @media only screen and (max-width: 768px) {
    padding: 1rem 0;
    padding-top: 0;
    padding-bottom: 1rem;
    margin: 0;
  }

  > span {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.8rem;
    @media only screen and (max-width: 768px) {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
  }
`;

const TextWrapper = styled(RatingsWrapper)`
  @media only screen and (max-width: 768px) {
    padding-top: 1rem;
  }
`;

const ReviewText = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  background-color: ${(props) => props.theme.colors.lightGrey};
  opacity: 0.7;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 8rem;
    padding: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

interface IEditReview {
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReviewUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  order: IOrderData;
}

function EditReview({ setShowEdit, setIsReviewUpdated, order }: IEditReview) {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState<IPostCommentForm>({
    contents: '',
    image_src: [],
    score: 0,
    order_detail_id: order?.order_detail_info.id,
    user_id: userinfo?.id!,
  });

  const fillPostForm = (data: IPostCommentFormPartial) => {
    setPostForm({ ...postForm, ...data });
  };

  const postReview = async () => {
    if (postForm.score === 0) {
      console.log('점수를 입력해주세요');
      return;
    }
    try {
      await postComments(postForm);
      console.log('완료');
      setIsReviewUpdated(true);
      setShowEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <RatingsWrapper>
        <span>상품은 만족하셨나요?</span>
        <StarRatings fillPostForm={fillPostForm} size="2rem"></StarRatings>
      </RatingsWrapper>
      <TextWrapper>
        <span>어떤 점이 좋았나요?</span>
        <ReviewText
          onChange={(e) => fillPostForm({ contents: e.currentTarget.value })}
          placeholder="상품평을 입력해주세요"
        ></ReviewText>
      </TextWrapper>
      <ReviewPhoto fillPostForm={fillPostForm}></ReviewPhoto>
      <ButtonWrapper>
        <ButtonBasic type="extraSmall" buttonClickHandler={postReview}>
          등록
        </ButtonBasic>
        <ButtonBasic
          type="extraSmall"
          backColor="white"
          textColor="black"
          buttonClickHandler={() => setShowEdit(false)}
        >
          취소
        </ButtonBasic>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default EditReview;
