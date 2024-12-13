import React, { useContext, useEffect } from "react";
import "../css/Header4.css";
import logo from "../images/C_logo_black4.png";
import { UserContext } from "../api/provider/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Header4() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log("현재 로그인 상태: ", user.isLogin);
  console.log("사용자 이메일: ", user.email);
  console.log("사용자 이름: ", user.userName);
  console.log("사용자 역할: ", user.role);

  const logout = () => {
    console.log("log out !!!!!!!!!!!!!!");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className="header">
      <nav className="nav">
        <a href="/" className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <span className="logo-text">COMNAWA</span>
        </a>

        <div className="nav-groups">
          {/* 좌측 정렬 메뉴 */}
          <ul className="nav-menu left-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/product/sorted">Products</a>
            </li>
            <li>
              <a href="/own-pc">Custom PC</a>
            </li>
            <li>
              <a href="/suggested-pc">Builded PC</a>
            </li>
            {user.role === 1 ? (
              <>
                <li>
                  <a href="/userpage">My Page</a>
                </li>
                <li>
                  <a href="/admin">Admin</a>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <a href="/userpage">My Page</a>
                </li>
              </>
            )}
          </ul>

          {/* 우측 정렬 메뉴 */}
          {user.email ? (
            <>
              <li>
                <div onClick={logout}>Log out</div>
              </li>
            </>
          ) : (
            <>
              <ul className="nav-menu right-menu">
                <li>
                  <a href="/login">Sign In</a>
                </li>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header4;
