import "./App.css";
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
  );
}

export default App;
