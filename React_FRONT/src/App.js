import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil"; // RecoilRoot 임포트
import Home from "./pages/Home.js";
import Login from "./pages/signup/Login.js";
import Signup from "./pages/signup/Signup";
import Header4 from "./components/Header4";
import Body4_1 from "./components/Body4_1";
import Body4_2 from "./components/Body4_2";
import Footer4 from "./components/Footer4";
import ProductDetail4 from "./product/ProductDetail4"; // 상세 페이지 컴포넌트 추가

import Shopping01 from "./pages/Shopping01";
import UserPage01 from "./pages/UserPage01";
import ProductSortComponent from "./components/ProductSortComponent01";
import OwnPC from "./components/OwnPC";
import SuggestedPC from "./components/SuggestedPC";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess";

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
          <div className="App">
            <Header4 />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/product/sorted" element={<Shopping01 />} />
              <Route
                path="/product/sorted/:urlCategoryId"
                component={ProductSortComponent}
                element={<Shopping01 />}
              />
              <Route path="/userpage" element={<UserPage01 />} />
              <Route path="/own-pc" element={<OwnPC />} />
              <Route path="/suggested-pc" element={<SuggestedPC />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route />
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
              <Route
                path="/"
                element={
                  <>
                    <Body4_1 />
                    <Body4_2 />
                  </>
                }
              />{" "}
              {/* 메인 페이지에 Body1과 Body2 보이도록 설정 */}
              <Route
                path="/product/:category/:productId"
                element={<ProductDetail4 />}
              />{" "}
              {/* 상세 페이지 라우트 설정 */}
            </Routes>
            <Footer4 />
          </div>
        </Router>
      </UserContextProvider>
    </RecoilRoot>
  );
}

export default App;
