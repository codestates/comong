import Modal from '../common/modal/Modal';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteClientHeadersToken } from '../../apis';
import { useAppDispatch } from '../../redux/configStore.hooks';
import { logout } from '../../redux/modules/userSlice';
import DeleteUserModalContent from '../common/modal/DeleteUserModalContent';
import { MenuWrapper, MyMenu } from './NavUser';

const Wrapper = styled.div``;

function NavSeller() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const getSelectedClass = (path: string) => {
    if (path === '' && pathname !== '/sellerpage') {
      return '';
    } else if (pathname.includes(path)) return 'selected';
    return '';
  };

  const logoutHandler = () => {
    dispatch(logout());
    deleteClientHeadersToken();
    navigate('/login');
  };

  return (
    <Wrapper>
      <MyMenu>MY MENU</MyMenu>
      <MenuWrapper>
        <h3>판매 관리</h3>
        <ul>
          <Link to="/sellerpage">
            <li className={getSelectedClass('')}>판매 현황</li>
          </Link>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>상품 관리</h3>
        <ul>
          <li>준비 중</li>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>알림</h3>
        <ul>
          <Link to="/sellerpage/notifications">
            <li className={getSelectedClass('notifications')}>알림</li>
          </Link>
        </ul>
      </MenuWrapper>
      <MenuWrapper>
        <h3>내 정보</h3>
        <ul>
          <li>회원 정보 수정</li>
          <li onClick={logoutHandler}>로그아웃</li>
          <li
            onClick={() => {
              setShowModal(true);
            }}
          >
            회원탈퇴
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

export default NavSeller;
