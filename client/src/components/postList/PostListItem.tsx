import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import { useAppSelector } from '../../redux/configStore.hooks';
import type { RootState } from '../../redux/configStore';
import { truncate } from 'fs';
import { useState } from 'react';
import { LoginNeedModalForList } from '../Modals/LoginNeedModalForList';

const PostListItem = ({ post, LoginCheck }: Props) => {
  const [isLoginModal, setIsLoginModal] = useState(false);

  const img_src = post.image_src
    ? post.image_src.split(',')[0]
    : 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';
  const seller = post.user.storename ? post.user.storename : 'hojin';
  const title = post.title;
  const id = post.id;

  const price = post.price.toLocaleString('en');
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const bookmarks = userinfo?.bookmarks;
  const itemData = useAppSelector((state: RootState) => state);
  const isLogin = itemData.userSlice.isLogin;

  const hearts = 90;
  const comments = 120;
  const rating = 4.7;

  return (
    <StLink to={`/item/${id}`}>
      <ItemContainer>
        <ItemImgContainer>
          <ItemImg src={img_src} />
        </ItemImgContainer>

        <TextContainer>
          <ItemSeller>{seller}</ItemSeller>
          <ItemTitle>{title}</ItemTitle>
          <HeartsAndCommentsAndRatingContainer>
            <Hearts>♥&nbsp;{hearts}</Hearts>
            <Comments>💬&nbsp;{comments}</Comments>
            <Rating>⭐&nbsp;{rating}</Rating>
          </HeartsAndCommentsAndRatingContainer>
          <PriceAndBookmarkContainer>
            <ItemPrice>{price}원</ItemPrice>
            <BookmarkContainer onClick={LoginCheck}>
              <BookmarkButton
                itemId={id}
                selected={bookmarks ? !!bookmarks.includes(id) : false}
              ></BookmarkButton>
            </BookmarkContainer>
          </PriceAndBookmarkContainer>
          {isLoginModal ? (
            <LoginNeedModalForList>로그인이 필요합니다</LoginNeedModalForList>
          ) : null}
        </TextContainer>
      </ItemContainer>
    </StLink>
  );
};

const StLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  font-family: 'roboto', 'Noto Sans KR';
  background-color: #fdfdfd;
  /* background-color: red; */
  /* &:hover {
    transform: scale(1.005);
  } */
  overflow: hidden;
  /* box-shadow: 0px 0px 12px #eeeeee; */
  height: 310px;
`;

const ItemImgContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;

  width: 90%;
  margin: auto;
  border-radius: 8px;
`;

const ItemImg = styled.img`
  /* height: 100%;
  width: 100%; */
  height: 180px;
  width: 100%;

  object-fit: cover;
  &:hover {
    /* object-fit: contain; */
    transform: scale(1.07);
  }
  @media only screen and (max-width: 1200px) {
    height: 270px;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    height: 170px;
    width: 100%;
  }
`;

const TextContainer = styled.div`
  cursor: pointer;
  /* width: 80%; */
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  height: 150px;
  /* position: relative; */
`;

const ItemSeller = styled.div`
  width: 100%;
  margin: auto;
  font-size: 13px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  line-height: 100%;
  font-weight: 700;
  color: #555555;
`;
const ItemTitle = styled.div`
  width: 100%;
  margin: auto;
  font-size: 15px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  line-height: 140%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;

const PriceAndBookmarkContainer = styled.div`
  display: flex;
`;

const ItemPrice = styled.div`
  width: 100%;
  margin: auto;
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #414141;
`;

const HeartsAndCommentsAndRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'roboto', 'Noto Sans KR';
  font-size: 12px;
  color: gray;
  font-weight: 500;
`;
const Hearts = styled.div`
  font-size: 13px;
  color: transparent; /* 기존 이모지 컬러 제거 */
  /* text-shadow: 0 0 0 ${(props) => props.theme.colors.pink}; */
  text-shadow: 0 0 0 ${(props) => props.theme.colors.purple};
`;
const Comments = styled.div`
  margin-left: 12px;
  font-size: 13px;
`;
const Rating = styled.div`
  margin-left: 10px;
  font-size: 13px;
  color: transparent; /* 기존 이모지 컬러 제거 */
  text-shadow: 0 0 0 ${(props) => props.theme.colors.accentColor}; /* 새 이모지 색상 부여 */
`;

const BookmarkContainer = styled.div`
  /* position: absolute;
  bottom: 10px;
  right: 10px; */
  position: relative;
  bottom: 2px;
`;

interface Props {
  post: {
    contents: string;
    createdAt?: string;
    id: number;
    image_src: string;
    item_has_categories?: [];
    price: number;
    title: string;
    updatedAT?: string;
    user: { storename: string };
    user_id: number;
  };
  LoginCheck?: () => void;
}

export default PostListItem;
