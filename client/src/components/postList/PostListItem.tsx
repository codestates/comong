import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import { useAppSelector } from '../../redux/configStore.hooks';
import { truncate } from 'fs';

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
  font-family: roboto;
  background-color: #fdfdfd;
  &:hover {
    transform: scale(1.005);
  }
  overflow: hidden;
  /* box-shadow: 0px 0px 12px #eeeeee; */
  height: 320px;
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
  height: 250px;
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
  height: 100px;
  position: relative;
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
  font-size: 14px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  line-height: 140%;
  height: 35px;
`;
const ItemPrice = styled.div`
  width: 100%;
  margin: auto;
  font-size: 15px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #414141;
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
}

const PostListItem = ({ post }: Props) => {
  const img_src = post.image_src
    ? post.image_src.split(',')[0]
    : 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';
  const seller = post.user.storename ? post.user.storename : 'hojin';
  const title = post.title;
  const id = post.id;

  const price = post.price.toLocaleString('en');
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const bookmarks = userinfo?.bookmarks;

  return (
    <StLink to={`/item/${id}`}>
      <ItemContainer>
        <ItemImgContainer>
          <ItemImg src={img_src} />
        </ItemImgContainer>
        <TextContainer>
          <ItemSeller>{seller}</ItemSeller>
          <ItemTitle>{title}</ItemTitle>
          <ItemPrice>{price}원</ItemPrice>
          <BookmarkButton
            itemId={id}
            selected={bookmarks ? !!bookmarks.includes(id) : false}
          ></BookmarkButton>
        </TextContainer>
      </ItemContainer>
    </StLink>
  );
};

export default PostListItem;
