import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  font-family: roboto;
  &:hover {
    transform: scale(1.03);
  }
`;

const ItemImg = styled.img`
  width: 80%;
  margin: auto;
  border-radius: 5px;
`;

const TextContainer = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ItemSeller = styled.div`
  width: 100%;
  margin: auto;
  font-size: 14px;
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
`;
const ItemPrice = styled.div`
  width: 100%;
  margin: auto;
  font-size: 14px;
  font-weight: 600;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: #414141;
`;

const PostListItem = ({ post }: any) => {
  const img_src = post.image_src
    ? post.image_src[0].url
    : 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';
  const seller = post.user.nickname ? post.user.nickname : 'hojin';
  const title = post.title;
  const price = AddComma(post.price);

  function AddComma(data_value: number) {
    return data_value.toLocaleString('en');
  }

  return (
    <ItemContainer>
      <ItemImg src="https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail"></ItemImg>
      <TextContainer>
        <ItemSeller>{seller}</ItemSeller>
        <ItemTitle>{title}</ItemTitle>
        <ItemPrice>{price}원</ItemPrice>
      </TextContainer>
    </ItemContainer>
  );
};

export default PostListItem;
