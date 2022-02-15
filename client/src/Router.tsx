import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneralJoin from './pages/join/GeneralJoin';
import Join from './pages/join/Join';
import SellerJoin from './pages/join/SellerJoin';
import List from './pages/List';
import Login from './pages/Login';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join/*" element={<Join />}>
          <Route path="" element={<GeneralJoin />}></Route>
          <Route path="seller" element={<SellerJoin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;