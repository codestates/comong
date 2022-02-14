import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const ItemImg = styled.img`
  width: 80%;
  margin: auto;
`;

const ItemTitle = styled.div``;

const PostListItem = ({ post }: any) => {
  // console.log(post.image_src[0]);
  // let source = { post.image_src ? post.image_src[0].url : null}

  return (
    <ItemContainer>
      <ItemImg src="https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail"></ItemImg>
      {/* <ItemTitle>코끼리 인형 + 100cm 바디필로우 세트</ItemTitle>
      <div>59000</div> */}
      <ItemTitle>{post.title}</ItemTitle>
      <div>{post.price}</div>
    </ItemContainer>
  );
};

export default PostListItem;
