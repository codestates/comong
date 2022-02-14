import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './pages/List';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
