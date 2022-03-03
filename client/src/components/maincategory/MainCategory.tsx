import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { getListAsync } from '../../redux/modules/listSlice';
import { setCategory } from '../../redux/modules/itemSlice';

const MainCategoriesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: 'roboto', 'Noto Sans KR';
  text-align: center;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1400px;
  background-color: white;
  @media only screen and (max-width: 1200px) {
    /* flex-wrap: wrap; */
  }
  @media only screen and (max-width: 768px) {
    margin-top: 0px;
  }
`;

const MainCategory = styled.div`
  cursor: pointer;
  width: 56px;
  margin: 5px;
  min-width: 44px;
  &:hover {
    transform: scale(1.05);
  }
  @media only screen and (max-width: 1200px) {
    /* flex-grow: 1; */
    width: 40px;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const MainCategoryIcon = styled.img`
  width: 55px;
  margin-bottom: 5px;
  @media only screen and (max-width: 1200px) {
    width: 40px;
    /* width: 100%; */
  }
  @media only screen and (max-width: 768px) {
  }
`;
const MainCategoryName = styled.span`
  font-size: 13.5px;
  font-family: 'roboto', 'Noto Sans KR';
  font-weight: bold;
  color: #444444;
  @media only screen and (max-width: 1200px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const TableContainer = styled.table`
  margin-top: 5px;
  /* border-collapse: collapse; */
  width: 100%;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  margin-top: 5px;
  border: 2px solid lightgrey;
`;
const TableColumn = styled.td`
  font-size: 12.5px;
  color: #414141;
  font-weight: bold;
  width: 25%;
  margin: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  border: 2px solid lightgrey;
  border-top: none;

  cursor: pointer;
  &:hover {
    font-weight: bold;
    transform: scale(1.035);
  }
`;

const MainCategories = () => {
  let arr = [
    {
      id: 0,
      pid: 0,
      depth: 0,
      category: '전체',
    },
    {
      id: 1,
      pid: 0,
      depth: 0,
      category: '뷰티',
    },
    {
      id: 2,
      pid: 0,
      depth: 0,
      category: '출산/유아',
    },
    {
      id: 3,
      pid: 0,
      depth: 0,
      category: '식품',
    },
    {
      id: 4,
      pid: 0,
      depth: 0,
      category: '생활용품',
    },
    {
      id: 5,
      pid: 0,
      depth: 0,
      category: '패션',
    },
    {
      id: 6,
      pid: 0,
      depth: 0,
      category: '가전제품',
    },
    {
      id: 7,
      pid: 0,
      depth: 0,
      category: '스포츠',
    },
    {
      id: 8,
      pid: 0,
      depth: 0,
      category: '자동차',
    },
    {
      id: 9,
      pid: 0,
      depth: 0,
      category: '완구/취미',
    },
    {
      id: 10,
      pid: 0,
      depth: 0,
      category: '문구용품',
    },
    {
      id: 11,
      pid: 0,
      depth: 0,
      category: '반려동물',
    },
  ];
  let nameList: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    nameList.push(arr[i].category);
  }

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const dispatch = useAppDispatch();

  const Mobile = () => {
    return (
      <>
        <TableContainer>
          <TableBody>
            <TableRow>
              <TableColumn onClick={() => dispatch(setCategory(0))}>
                {nameList[0]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(setCategory(1))}>
                {nameList[1]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(setCategory(2))}>
                {nameList[2]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(setCategory(3))}>
                {nameList[3]}
              </TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn onClick={() => dispatch(getListAsync(4))}>
                {nameList[4]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(getListAsync(5))}>
                {nameList[5]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(getListAsync(6))}>
                {nameList[6]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(getListAsync(7))}>
                {nameList[7]}
              </TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn onClick={() => dispatch(getListAsync(8))}>
                {nameList[8]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(getListAsync(9))}>
                {nameList[9]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(getListAsync(10))}>
                {nameList[10]}
              </TableColumn>
              <TableColumn onClick={() => dispatch(getListAsync(11))}>
                {nameList[11]}
              </TableColumn>
            </TableRow>
          </TableBody>
        </TableContainer>
      </>
    );
  };

  return (
    <MainCategoriesContainer>
      {width > 768 ? (
        nameList.map((el, i) => {
          console.log(el, i);
          return (
            <MainCategory
              key={el + i + 100}
              onClick={() => {
                dispatch(setCategory(i));
              }}
            >
              <MainCategoryIcon
                key={el + i}
                src={`icons/maincategories/category${i}.png`}
              />
              <MainCategoryName key={el + i + 200}>{el}</MainCategoryName>
            </MainCategory>
          );
        })
      ) : (
        <Mobile></Mobile>
      )}
    </MainCategoriesContainer>
  );
};

export default MainCategories;
