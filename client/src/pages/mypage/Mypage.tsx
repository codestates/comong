import React from 'react';
import { Outlet } from 'react-router-dom';
import MypageAsideBar from '../../components/mypage/MypageAsideBar';

function Mypage() {
  return (
    <main>
      <MypageAsideBar></MypageAsideBar>
      <Outlet />
    </main>
  );
}

export default Mypage;
