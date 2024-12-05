import "./App.css";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserStore from "./context/UserStore";
import Signup from "./pages/signup/Signup";
import Login from "./pages/signup/login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Shopping01 from "./pages/Shopping01";
import UserCart01 from "./pages/UserCart01";
import ProductSortComponent from "./components/ProductSortComponent01";

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
              element={<Shopping01 />}
            />
            <Route path="/usercart" element={<UserCart01 />} />
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
