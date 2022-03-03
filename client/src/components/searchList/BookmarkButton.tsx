import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userInfo } from 'os';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { postBookmarkAsync } from '../../redux/modules/userSlice';
import { ReactComponent as HeartIcon } from '../../asset/heartIcon.svg';

const Heart = styled(HeartIcon)`
  width: 12px;
  height: 12px;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 4px 8px;
  position: absolute;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.darkGrey};
  border-radius: 8px;
  right: 0;
  bottom: 4px;

  &.selected {
    border: 1px solid #dd576f;

    ${Heart} {
      fill: #dd576f;
    }
  }

  &:hover {
    border: 1px solid #dd576f;
    ${Heart} {
      fill: #dd576f;
    }
  }
`;

interface IBookmarkButton {
  selected: boolean;
  itemId: number;
}

function BookmarkButton({ selected, itemId }: IBookmarkButton) {
  const dispatch = useAppDispatch();
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const setBookmarkHandler = async () => {
    try {
      const ismarked = userinfo?.bookmarks.includes(itemId);
      const params = {
        user_id: userinfo?.id!,
        item_id: itemId,
        ismarked: !ismarked,
      };
      await dispatch(postBookmarkAsync(params)).unwrap();
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
      <Heart />
    </Wrapper>
  );
}

export default BookmarkButton;
