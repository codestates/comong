import { RecordWithTtl } from 'dns';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { logout } from '../../redux/modules/userSlice';
import DeleteUserModalContent from '../common/modal/DeleteUserModalContent';
import Modal from '../common/modal/Modal';

const Wrapper = styled.nav``;

export const MyMenu = styled.div`
  height: 40px;
  background-color: ${(props) => props.theme.colors.accentColor};
  color: ${(props) => props.theme.colors.bgColor};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const MenuWrapper = styled.div`
  margin: 10px 20px;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  ul {
    padding: 15px 10px;
  }

  li {
    font-size: 16px;
    margin-bottom: 15px;

    &:hover {
      color: ${(props) => props.theme.colors.accentColor};
      cursor: pointer;
    }

    &.selected {
      color: ${(props) => props.theme.colors.accentColor};
    }
  }
`;

function NavUser() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const getSelectedClass = (path: string) => {
    if (pathname.includes(path)) return 'selected';
    return '';
  };

  return (
    <Wrapper>
      <MyMenu>MY MENU</MyMenu>
      <MenuWrapper>
        <h3>쇼핑</h3>
        <ul>
          <Link to="/mypage/userOrderHistory">
            <li className={getSelectedClass('userOrderHistory')}>주문 내역</li>
          </Link>
          <Link to="/mypage/reviews">
            <li className={getSelectedClass('reviews')}>내가 쓴 후기</li>
          </Link>
          <Link to="/mypage/bookmarks">
            <li className={getSelectedClass('bookmarks')}>찜 리스트</li>
          </Link>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>알림</h3>
        <ul>
          <li>알림</li>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>내 정보</h3>
        <ul>
          <Link to="/mypage/modifyInfo">
            <li className={getSelectedClass('modifyInfo')}>회원 정보 수정</li>
          </Link>
          <li
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
          >
            로그아웃
          </li>
          <li
            onClick={() => {
              setShowModal(true);
            }}
          >
            회원 탈퇴
          </li>
        </ul>
      </MenuWrapper>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <DeleteUserModalContent
            setShowModal={setShowModal}
          ></DeleteUserModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

export default NavUser;
