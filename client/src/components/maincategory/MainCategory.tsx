import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { getListAsync } from '../../redux/modules/listSlice';

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
  min-width: 52px;
  &:hover {
    transform: scale(1.05);
  }
  @media only screen and (max-width: 1200px) {
    /* flex-grow: 1; */
  }
  @media only screen and (max-width: 768px) {
  }
`;
const MainCategoryIcon = styled.img`
  width: 50px;
  margin-bottom: 5px;
  @media only screen and (max-width: 1200px) {
    width: 45px;
  }
  @media only screen and (max-width: 768px) {
  }
`;
const MainCategoryName = styled.span`
  font-size: 12.5px;
  font-weight: bold;
  color: #444444;
  @media only screen and (max-width: 1200px) {
    font-size: 11.5px;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  margin-top: 5px;
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
`;

const MainCategories = () => {
  let arr = [
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
    {
      id: 12,
      pid: 0,
      depth: 0,
      category: '여행/티켓',
    },
  ];
  let nameList: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    nameList.push(arr[i].category);
  }

  // console.log(nameList);

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
              <TableColumn>{nameList[0]}</TableColumn>
              <TableColumn>{nameList[1]}</TableColumn>
              <TableColumn>{nameList[2]}</TableColumn>
              <TableColumn>{nameList[3]}</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>{nameList[4]}</TableColumn>
              <TableColumn>{nameList[5]}</TableColumn>
              <TableColumn>{nameList[6]}</TableColumn>
              <TableColumn>{nameList[7]}</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>{nameList[8]}</TableColumn>
              <TableColumn>{nameList[9]}</TableColumn>
              <TableColumn>{nameList[10]}</TableColumn>
              <TableColumn>{nameList[11]}</TableColumn>
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
          return (
            <MainCategory key={el + i + 100}>
              <MainCategoryIcon
                key={el + i}
                onClick={() => dispatch(getListAsync(i + 1))}
                src={`icons/maincategories/cat${i}.png`}
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
