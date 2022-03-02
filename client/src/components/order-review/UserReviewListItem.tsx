import React from 'react';
import styled from 'styled-components';
import { IReviewList } from '../../pages/mypage/mypage_user/MypageReviews';
import ButtonSimple from '../common/button/ButtonSimple';
import StarRatings from './StarRatings';

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  margin-bottom: 1.2rem;
  border: 1px solid black;
`;

const ItemWrapper = styled.div`
  height: 50%;
  padding-bottom: 1rem;
  display: flex;
  gap: 2rem;

  img {
    width: 100px;
    height: 100px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }
`;

const ReviewWrapper = styled.div`
  height: 50%;
  padding: 1rem 0 1.5rem 0.2rem;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-between;

  div.review {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div.ratings {
    width: 100px;
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;

    span {
      margin-top: 4px;
      font-weight: 700;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface IUserReviewListItem {
  info: IReviewList;
}

function UserReviewListItem({ info }: IUserReviewListItem) {
  const { item_reviewInfo: reviewInfo, itemInfo } = info;
  console.log(reviewInfo);

  return (
    <Wrapper>
      <ItemWrapper className="area-item">
        <img src={itemInfo.image_src} />
        <div>
          <span>{itemInfo.title}</span>
          <span>판매자</span>
        </div>
      </ItemWrapper>
      <ReviewWrapper className="area-review">
        <div className="review">
          <div className="ratings">
            <StarRatings score={reviewInfo.score}></StarRatings>
            <span>{reviewInfo.score}</span>
          </div>
          <span>{reviewInfo.contents}</span>
        </div>
        <ButtonWrapper>
          <ButtonSimple buttonClickHandler={() => {}}>수정하기</ButtonSimple>
          <ButtonSimple buttonClickHandler={() => {}}>삭제하기</ButtonSimple>
        </ButtonWrapper>
      </ReviewWrapper>
    </Wrapper>
  );
}

export default UserReviewListItem;
