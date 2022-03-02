import PostList from '../components/postList/PostList';
import styled from 'styled-components';
import Banner from '../components/Banner';
import MainCategories from '../components/maincategory/MainCategory';
const ListContainer = styled.div`
  font-family: 'roboto', 'Noto Sans KR';
  width: 100%;
`;

const List = () => {
  return (
    <ListContainer>
      <Banner></Banner>
      <MainCategories></MainCategories>
      <PostList></PostList>
    </ListContainer>
  );
};

export default List;
