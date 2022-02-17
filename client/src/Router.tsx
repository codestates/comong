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

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join/*" element={<Join />}>
          <Route path="" element={<GeneralJoin />}></Route>
          <Route path="seller" element={<SellerJoin />}></Route>
          <Route path="oauth" element={<OauthGeneralJoin />}></Route>
          <Route path="oauth/seller" element={<OauthSellerJoin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
