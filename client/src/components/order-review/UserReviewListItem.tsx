import React from 'react';
import styled from 'styled-components';
import { deleteComments } from '../../apis/api/comment';
import { IReviewList } from '../../pages/mypage/mypage_user/MypageReviews';
import ButtonSimple from '../common/button/ButtonSimple';
import StarRatings from './StarRatings';

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 1rem;
  box-shadow: 1px 2px 4px ${(props) => props.theme.colors.bgColor};
`;

const ItemWrapper = styled.div`
  height: 50%;
  padding-bottom: 1rem;
  display: flex;
  gap: 2rem;

  img {
    width: 4rem;
    height: 4rem;
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
  padding: 1rem 0 1rem 0.2rem;
  border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
  display: flex;
  justify-content: space-between;

  div.review {
    width: 50%;
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

const PhotoWrapper = styled.div`
  width: 30%;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

const ReviewPhoto = styled.img`
  width: 4rem;
  height: 4rem;
  padding: 1px;
`;

const ButtonWrapper = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface IUserReviewListItem {
  info: IReviewList;
  reviewList: IReviewList[] | undefined;
  setReviewList: React.Dispatch<
    React.SetStateAction<IReviewList[] | undefined>
  >;
  idx: number;
}

function UserReviewListItem({
  info,
  reviewList,
  setReviewList,
  idx,
}: IUserReviewListItem) {
  const { item_reviewInfo: reviewInfo, itemInfo } = info;
  const showPhotos = () => {
    const imgData = reviewInfo.image_src;
    if (!imgData) return;
    const imgList = imgData.slice(1, imgData.length - 1).split(',');
    return imgList.map((src) => {
      if (src === '') return;
      else return <ReviewPhoto src={src.slice(1, src.length - 1)} />;
    });
  };

  const deleteHandler = () => {
    deleteComments(reviewInfo.id);
    reviewList &&
      setReviewList([
        ...reviewList.slice(0, idx),
        ...reviewList.slice(idx + 1),
      ]);
  };

  return (
    <Wrapper>
      <ItemWrapper className="area-item">
        <img src={itemInfo.image_src.split(',')[0]} />
        <div>
          <span>{itemInfo.title}</span>
          <span>판매자</span>
        </div>
      </ItemWrapper>
      <ReviewWrapper className="area-review">
        <div className="review">
          <div className="ratings">
            <StarRatings score={reviewInfo.score} size="1rem"></StarRatings>
            <span>{reviewInfo.score}</span>
          </div>
          <span>{reviewInfo.contents}</span>
        </div>
        <PhotoWrapper>{showPhotos()}</PhotoWrapper>
        <ButtonWrapper>
          <ButtonSimple buttonClickHandler={deleteHandler}>
            삭제하기
          </ButtonSimple>
        </ButtonWrapper>
      </ReviewWrapper>
    </Wrapper>
  );
}

export default UserReviewListItem;
