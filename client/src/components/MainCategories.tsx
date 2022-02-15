import styled from 'styled-components';

const MainCategoriesContainer = styled.div`
  display: flex;

  justify-content: space-around;
  font-family: roboto;
  text-align: center;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1400px;
  background-color: white;
  @media only screen and (max-width: 1200px) {
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const MainCategory = styled.div`
  width: 60px;
  margin: 15px;
  min-width: 60px;
  &:hover {
    transform: scale(1.15);
  }
  @media only screen and (max-width: 1200px) {
    flex-grow: 1;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const MainCategoryIcon = styled.img`
  width: 60px;
  margin-bottom: 5px;
  @media only screen and (max-width: 1200px) {
    /* display: none; */
  }
  @media only screen and (max-width: 768px) {
  }
`;
const MainCategoryName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #444444;
  color: #b8b8b8;
`;

const MainCategories = () => {
  return (
    <MainCategoriesContainer>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/maincategories/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
    </MainCategoriesContainer>
  );
};

export default MainCategories;
