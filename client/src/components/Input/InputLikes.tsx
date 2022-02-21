import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import LikesListItem from './LikesListItem';

const Wrppaer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  width: 20%;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const LikesList = styled.ul`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

interface IInpuLikes {
  fillJoinForm: (obj: IJoinPartial) => void;
}

interface ICategory {
  id: number;
  pid: number;
  depth: number;
  category: string;
}

function InputLikes({ fillJoinForm }: IInpuLikes) {
  const categoryList = [
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

  // !TODO api 완성되면 바꾸기! 임시 작업 상태
  // 스토어에서 가져온 likes(여기 userLikes라는 변수)가 먼저 선택 되어있어야함
  // 화면상 표시 + joinform에 들어있어야함
  let userLikes = [1, 2, 3]; // here
  const [value, setValues] = useState<number[]>(userLikes);

  useEffect(() => {
    fillJoinForm({ likes: value });
  }, [value]);

  const fillList = (id: number) => {
    setValues([...value, id]);
  };

  const deleteListItem = (id: number) => {
    let idx = value.findIndex((el) => el === id);
    setValues([...value.slice(0, idx), ...value.slice(idx + 1)]);
  };

  const makeCategoryList = (categories: Array<ICategory>) => {
    return categories.map((obj) => {
      return (
        <LikesListItem
          key={obj.id}
          id={obj.id}
          fillList={fillList}
          deleteListItem={deleteListItem}
          selected={value.includes(obj.id) ? true : false}
        >
          {obj.category}
        </LikesListItem>
      );
    });
  };

  return (
    <Wrppaer>
      <Title>관심사</Title>
      <LikesList>{makeCategoryList(categoryList)}</LikesList>
    </Wrppaer>
  );
}

export default InputLikes;
