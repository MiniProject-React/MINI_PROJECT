import "./App.css";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserStore from "./context/UserStore";
import Signup from "./pages/signup/Signup";
import Login from "./pages/signup/login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Shopping01 from "./pages/Shopping01";
import OwnPC from "./components/OwnPC";
import SuggestedPC from "./components/SuggestedPC";

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
            <Route path="/shopping" element={<Shopping01 />} />
          <Route path="/own-pc" element={<OwnPC />} />
          <Route path="/suggested-pc" element={<SuggestedPC />} />
            <Route />
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
