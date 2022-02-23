import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getComments } from '../../../apis/api/comment';
import { useAppSelector } from '../../../redux/configStore.hooks';

const Wrapper = styled.ul``;

interface IReviewList {
  [key: string]: {
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
  };
}

function MypageReviews() {
  useEffect(() => {
    fetchData();
  }, []);

  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [reviewList, setReviewList] = useState<IReviewList>();

  const fetchData = async () => {
    try {
      const response = await getComments(userinfo?.id!);
      console.log(response);
    } catch (error) {}
  };

  const showReviewList = () => {};

  return (
    <div>
      <h2>내가 쓴 후기</h2>
      <Wrapper></Wrapper>
    </div>
  );
}

export default MypageReviews;
