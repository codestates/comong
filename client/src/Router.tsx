import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import MobileNav from './components/MobileNav';

import Notifications from './pages/Notifications';
import PrivateRoute from './components/common/PrivateRoute';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingIndicator } from './constants';
import { useAppDispatch, useAppSelector } from './redux/configStore.hooks';
import type { RootState } from './redux/configStore';
import { Suspense, lazy } from 'react';

const GeneralJoin = lazy(() => import('./pages/join/GeneralJoin'))
const Join = lazy(() => import('./pages/join/Join'))
const OauthGeneralJoin = lazy(() => import('./pages/join/OauthGeneralJoin'))
const OauthSellerJoin = lazy(() => import('./pages/join/OauthSellerJoin'))
const SellerJoin = lazy(() => import('./pages/join/SellerJoin'))

const Mypage = lazy(() => import('./pages/mypage/Mypage'))
const MypageUserDefault = lazy(() => import('./pages/mypage/mypage_user/MypageUserDefault'))
const UserOrderHistory = lazy(() => import('./pages/mypage/mypage_user/UserOrderHistory'))
const MypageBookmarks = lazy(() => import('./pages/mypage/mypage_user/MypageBookmarks'))
const MypageReviews = lazy(() => import('./pages/mypage/mypage_user/MypageReviews'))
const MypageSellerDefault = lazy(() => import('./pages/mypage/mypage_seller/MypageSellerDefault'))
const MypageSellerItems = lazy(() => import('./pages/mypage/mypage_seller/MypageSellerItems'))

const List = lazy(() => import('./pages/List'))
const Search = lazy(() => import('./pages/Search'))
const Login = lazy(() => import('./pages/Login'))
const Cart = lazy(() => import('./pages/Cart'))
const Post = lazy(() => import('./pages/Post'))
const Payment = lazy(() => import('./pages/Payment'))
const Add = lazy(() => import('./pages/Add'))
const PaymentResult = lazy(() => import('./pages/PaymentResult'))

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Routers() {
  // const { role } = useAppSelector((state) => state.userSlice);

  const data = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const isLoading = data.loadingSlice.isLoading;

  console.log('isLoading', isLoading);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav></Nav>
      {isLoading ? <LoadingIndicator /> : null}
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/item/:id" element={<Post />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join/*" element={<Join />}>
          <Route path="" element={<GeneralJoin />}></Route>
          <Route path="seller" element={<SellerJoin />}></Route>
          <Route path="oauth/:type" element={<OauthGeneralJoin />}></Route>
          <Route
            path="oauth/:type/seller"
            element={<OauthSellerJoin />}
          ></Route>
        </Route>
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="payment" element={<Payment />}></Route>
          <Route path="paymentresult" element={<PaymentResult />}></Route>
        </Route>
        <Route path="mypage/*" element={<PrivateRoute />}>
          <Route path="" element={<Mypage />}>
            <Route path="" element={<MypageUserDefault />}></Route>
            <Route
              path="userOrderHistory"
              element={<UserOrderHistory />}
            ></Route>
            <Route path="reviews" element={<MypageReviews />}></Route>
            <Route path="bookmarks" element={<MypageBookmarks />}></Route>
            <Route path="modifyInfo" element={<GeneralJoin />}></Route>
            <Route path="notifications" element={<Notifications />}></Route>
          </Route>
        </Route>
        <Route path="sellerpage/*" element={<PrivateRoute />}>
          <Route path="" element={<Mypage />}>
            <Route path="" element={<MypageSellerDefault />}></Route>
            <Route path="itemlist" element={<MypageSellerItems />}></Route>
            <Route path="notifications" element={<Notifications />}></Route>
            <Route path="new" element={<Add />}></Route>
          </Route>
        </Route>
      </Routes>
      <MobileNav></MobileNav>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routers;
