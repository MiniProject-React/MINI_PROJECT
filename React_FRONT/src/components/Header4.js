import React from "react";
import "../css/Header4.css";
import logo from "../images/C_logo_black4.png";

function Header4() {
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
            <li>
              <a href="/userpage">My Page</a>
            </li>
            <li>
              <a href="/admin">Admin</a>
            </li>
            <li>
              <a href="/admin/users">Users List</a>
            </li>
          </ul>

          {/* 우측 정렬 메뉴 */}
          <ul className="nav-menu right-menu">
            <li>
              <a href="/login">Sign In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header4;
