import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getComments } from '../../../apis/api/comment';
import UserReviewListItem from '../../../components/order-review/UserReviewListItem';
import { useAppSelector } from '../../../redux/configStore.hooks';

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const NoData = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.greyForMenu};
  border-radius: 1rem;
`;

export interface IReviewList {
  itemInfo: {
    contents: string;
    createdAt: string;
    id: number;
    image_src: string;
    price: number;
    title: string;
    updatedAt: string;
    user_id: number;
  };
  item_reviewInfo: {
    contents: string;
    createdAt: string;
    id: number;
    image_src: string | null;
    order_detail_id: number;
    score: number;
    updatedAt: string;
    user_id: 2;
  };
}

function MypageReviews() {
  useEffect(() => {
    fetchData();
  }, []);

  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [reviewList, setReviewList] = useState<IReviewList[]>();

  const fetchData = async () => {
    try {
      const response = await getComments(userinfo?.id!);
      setReviewList(response);
    } catch (error) {}
  };

  return (
    <div>
      <h2>내가 쓴 후기</h2>
      <Wrapper>
        {reviewList && reviewList.length > 0 ? (
          reviewList?.map((obj, idx) => {
            return (
              <UserReviewListItem
                info={obj}
                reviewList={reviewList}
                setReviewList={setReviewList}
                idx={idx}
              ></UserReviewListItem>
            );
          })
        ) : (
          <NoData>후기를 작성해보세요</NoData>
        )}
      </Wrapper>
    </div>
  );
}

export default MypageReviews;
