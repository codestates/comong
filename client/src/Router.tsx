import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneralJoin from './pages/join/GeneralJoin';
import Join from './pages/join/Join';
import OauthGeneralJoin from './pages/join/OauthGeneralJoin';
import OauthSellerJoin from './pages/join/OauthSellerJoin';
import SellerJoin from './pages/join/SellerJoin';
import List from './pages/List';
import Search from './pages/Search';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Nav from './components/Nav';
import MobileNav from './components/MobileNav';
import Post from './pages/Post';
import Payment from './pages/Payment';
import { useAppSelector } from './redux/configStore.hooks';
import Mypage from './pages/mypage/Mypage';
import MypageUserDefault from './pages/mypage/mypage_user/MypageUserDefault';
import UserOrderHistory from './pages/mypage/mypage_user/UserOrderHistory';
import MypageBookmarks from './pages/mypage/mypage_user/MypageBookmarks';
import MypageReviews from './pages/mypage/mypage_user/MypageReviews';
import MypageSellerDefault from './pages/mypage/mypage_seller/MypageSellerDefault';
import MypageSellerItems from './pages/mypage/mypage_seller/MypageSellerItems';

function Routers() {
  const { role } = useAppSelector((state) => state.userSlice);

  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/item/:id" element={<Post />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join/*" element={<Join />}>
          <Route path="" element={<GeneralJoin />}></Route>
          <Route path="seller" element={<SellerJoin />}></Route>
          <Route path="oauth" element={<OauthGeneralJoin />}></Route>
          <Route path="oauth/seller" element={<OauthSellerJoin />}></Route>
        </Route>
        <Route path="mypage/*" element={<Mypage />}>
          <Route path="" element={<MypageUserDefault />}></Route>
          <Route path="userOrderHistory" element={<UserOrderHistory />}></Route>
          <Route path="reviews" element={<MypageReviews />}></Route>
          <Route path="bookmarks" element={<MypageBookmarks />}></Route>
          <Route path="modifyInfo" element={<GeneralJoin />}></Route>
        </Route>
        <Route path="sellerpage/*" element={<Mypage />}>
          <Route path="" element={<MypageSellerDefault />}></Route>
          <Route path="itemlist" element={<MypageSellerItems />}></Route>
        </Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
      <MobileNav></MobileNav>
    </BrowserRouter>
  );
}

export default Routers;
