import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import AdminHome from "./pages/admin/AdminHome";
import Address from "./pages/signup/address";
import EmailVerification from "./pages/admin/EmailVerification.js";
import DragAndDropThreeLists from "./pages/admin/TableDrad.js";
import SwiperExample from "./pages/admin/Swiper.js";
import Swiper2 from "./pages/admin/Swiper2.js";
import ProductSwiper from "./pages/admin/ImageArray.js";
function App() {
  return (
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
