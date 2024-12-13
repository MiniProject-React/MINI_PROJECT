import React, { useContext, useEffect, useState } from "react";
import AdminHome from "./AdminProducts/AdminHome";
import { AdminUsersMap } from "../../api/provider/UserSearchContextProvider";
import { Container } from "./style/Container";
import "./style/Tab.css";
import { UserContext } from "../../api/provider/UserContextProvider";
import { useNavigate } from "react-router-dom";
const AdminTab = () => {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();

  return (
    <Container className="products-users">
      <ul className="tabmenu">
        <li
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          <a href="#products">상품 관리</a>
        </li>
        <li
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          <a href="#users">회원 관리</a>
        </li>
      </ul>

      <div className="tabcontent">
        {activeTab === "products" && (
          <div id="products" className="active">
            <AdminHome />
          </div>
        )}
        {activeTab === "users" && (
          <div id="users" className="active">
            <AdminUsersMap />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminTab;
