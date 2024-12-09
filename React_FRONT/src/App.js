import "./App.css";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil"; // RecoilRoot 임포트
import Home from "./pages/Home.js";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import AdminHome from "./pages/admin/AdminHome";
import Address from "./pages/signup/address.js";
import EmailVerification from "./pages/admin/EmailVerification.js";
import DragAndDropThreeLists from "./pages/admin/TableDrad.js";
import SwiperExample from "./pages/admin/Swiper.js";
import Swiper2 from "./pages/admin/Swiper2.js";
import ProductSwiper from "./pages/admin/ImageArray.js";
import { UserContextProvider } from "./api/provider/UserContextProvider.js";
import { AdminUsersMap } from "./api/provider/UserSearchContextProvider.js";
import AdminUserOrder from "./pages/admin/AdminOrders/AdminUserOrder.js";
function App() {
  return (
    // RecoilRoot로 앱을 감싸서 Recoil 상태 관리 사용
    <RecoilRoot>
      {/* UserContextProvider는 Router와 Routes를 감싸야 함 */}
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/address" element={<Address />} />
            <Route path="/mail" element={<EmailVerification />} />
            <Route path="/td" element={<DragAndDropThreeLists />} />
            <Route path="/swiper" element={<SwiperExample />} />
            <Route path="/swiper2" element={<Swiper2 />} />
            <Route path="/ps" element={<ProductSwiper />} />
            <Route path="/users" element={<AdminUsersMap />} />
            <Route
              path="/users/orderlist/:user_id"
              element={<AdminUserOrder />}
            />
          </Routes>
        </Router>
      </UserContextProvider>
    </RecoilRoot>
=======
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserStore from "./context/UserStore";
import Signup from "./pages/signup/Signup";
import Login from "./pages/signup/login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Shopping01 from "./pages/Shopping01";

import UserPage01 from "./pages/UserPage01";
import ProductSortComponent from "./components/ProductSortComponent01";
import OwnPC from "./components/OwnPC";
import SuggestedPC from "./components/SuggestedPC";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess";


function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/product/sorted" element={<Shopping01 />} />
            <Route
              path="/product/sorted/:urlCategoryId"
              component={ProductSortComponent}
              element={<Shopping01 />} />
            <Route path="/userpage" element={<UserPage01 />} />
            <Route path="/own-pc" element={<OwnPC />} />
            <Route path="/suggested-pc" element={<SuggestedPC />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order-success" element={<OrderSuccess />} />      
            <Route />
          </Routes>
        </Router>
      </UserStore>
    </>
>>>>>>> origin/develop
  );
}

export default App;
