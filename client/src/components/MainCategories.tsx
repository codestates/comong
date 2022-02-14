import styled from 'styled-components';

const MainCategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: roboto;
  text-align: center;
  margin: auto;
  margin-top: 30px;
  max-width: 1000px;
  background-color: #ffffff;
`;

const MainCategory = styled.div`
  width: 60px;
  margin: 15px;
`;
const MainCategoryIcon = styled.img`
  width: 60px;
  margin-bottom: 5px;
`;
const MainCategoryName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #444444;
`;

const MainCategories = () => {
  return (
    <MainCategoriesContainer>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
      <MainCategory>
        <MainCategoryIcon src="icons/food.png" />
        <MainCategoryName>음식</MainCategoryName>
      </MainCategory>
    </MainCategoriesContainer>
  );
};

export default MainCategories;
