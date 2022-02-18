import React, { useState } from 'react';
import styled from 'styled-components';

const ListItemWrapper = styled.li`
  padding: 10px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.accentColorLight};
  border-radius: 10px;
  color: ${(props) => props.theme.colors.accentColor};
  font-size: 15px;

  &.selected {
    background-color: ${(props) => props.theme.colors.accentColorLight};
    color: ${(props) => props.theme.colors.textColor};
  }

  &:hover {
    cursor: pointer;
  }
`;

interface ILikesListItem {
  id: number;
  children: string;
  fillList: (id: number) => void;
  deleteListItem: (id: number) => void;
}

function LikesListItem({
  id,
  children,
  fillList,
  deleteListItem,
}: ILikesListItem) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <ListItemWrapper
      className={isClicked ? 'selected' : ''}
      onClick={() => {
        isClicked ? deleteListItem(id) : fillList(id);
        setIsClicked(!isClicked);
      }}
    >
      {children}
    </ListItemWrapper>
  );
}

export default LikesListItem;
