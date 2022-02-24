import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userInfo } from 'os';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { postBookmarkAsync } from '../../redux/modules/userSlice';

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
  itemId: number;
}

function BookmarkButton({ selected, itemId }: IBookmarkButton) {
  // useerslice에서 북마크 리스트 받아와서 해당하는 거만 빨갛게 표시
  const dispatch = useAppDispatch();
  const { userinfo } = useAppSelector((state) => state.userSlice);

  console.log(selected, itemId);
  const setBookmarkHandler = async () => {
    // 스토어 북마크 추가
    try {
      const ismarked = userinfo?.bookmarks.includes(itemId);
      const params = {
        user_id: userinfo?.id!,
        item_id: itemId,
        ismarked: !ismarked,
      };
      const response = await dispatch(postBookmarkAsync(params)).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
      console.log('로그인 하세요!');
    }
  };

  return (
    <Wrapper
      className={selected ? 'selected' : ''}
      onClick={(e) => {
        e.preventDefault();
        setBookmarkHandler();
      }}
    >
      <FontAwesomeIcon icon={faHeart} />
    </Wrapper>
  );
}

export default BookmarkButton;
