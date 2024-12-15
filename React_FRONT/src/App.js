import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil"; // RecoilRoot 임포트
import Home from "./pages/Home.js";
import SignIn from "./pages/signup/SignIn.js";
import Signup from "./pages/signup/Signup";
import Shopping01 from "./pages/Shopping01";
import UserPage01 from "./pages/UserPage01";
import ProductSortComponent from "./components/ProductSortComponent01";
import OwnPC from "./components/OwnPC";
import SuggestedPC from "./components/SuggestedPC";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess";
// import AdminHome from "./pages/admin/AdminHome";
import { UserContextProvider } from "./api/provider/UserContextProvider.js";
// import { AdminUsersMap } from "./api/provider/UserSearchContextProvider.js";
import AdminUserOrderList from "./pages/admin/AdminOrders/AdminUserOrderList.js";
import Header4 from "./components/Header4";
import Body4_1 from "./components/Body4_1";
import Body4_2 from "./components/Body4_2";
import Footer4 from "./components/Footer4";
import ProductDetail4 from "./product/ProductDetail4";
// 상세 페이지 컴포넌트 추가
import AdminTab from "./pages/admin/AdminTab.js";
import PracticeSelect from "./pages/admin/AdminOrders/PracticeSelect.js";
import Find_ID_or_PW from "./pages/signup/Find_ID_or_PW.js";
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
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminTab />} />
              <Route path="/select" element={<PracticeSelect />} />
              <Route path="/find" element={<Find_ID_or_PW />} />
              <Route
                path="/users/orderlist/:user_id"
                element={<AdminUserOrderList />}
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
