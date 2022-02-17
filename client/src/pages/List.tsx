import PostList from '../components/postList/PostList';
import styled from 'styled-components';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import MainCategories from '../components/maincategory/MainCategory';
import MobileNav from '../components/MobileNav';

const List = () => {
  const ListContainer = styled.div`
    width: 100%;
  `;

  return (
    <ListContainer>
      <Banner></Banner>
      <MainCategories></MainCategories>
      <PostList></PostList>
    </ListContainer>
  );
};

export default List;
