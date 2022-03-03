import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/configStore.hooks';

function PrivateRoute() {
  const { isLogin } = useAppSelector((state) => state.userSlice);
  return isLogin ? <Outlet></Outlet> : <Navigate to="/login" />;
}

export default PrivateRoute;
