import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  padding: 4px 8px;
  position: absolute;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.darkGrey};
  border-radius: 8px;
  right: 0;
  bottom: 10px;

  &.selected {
    color: red;
    border: 1px solid red;
  }

  &:hover {
    color: red;
    border: 1px solid red;
  }
`;

interface IBookmarkButton {
  selected: boolean;
}

function BookmarkButton({ selected }: IBookmarkButton) {
  // useerslice에서 북마크 리스트 받아와서 해당하는 거만 빨갛게 표시

  return (
    <Wrapper
      onClick={(e) => {
        e.preventDefault();
        console.log('hi');
      }}
    >
      <FontAwesomeIcon icon={faHeart} className={selected ? 'selected' : ''} />
    </Wrapper>
  );
}

export default BookmarkButton;
