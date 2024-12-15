import React, { useContext, useEffect, useState } from "react";
import AdminHome from "./AdminProducts/AdminHome";
import { AdminUsersMap } from "../../api/provider/UserSearchContextProvider";
import { Container } from "./style/Container";
import "./style/Tab.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../api/provider/UserContextProvider";

const AdminTab = () => {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log("현재 로그인 상태: ", user.isLogin);
    console.log("사용자 이메일: ", user.email);
    console.log("사용자 이름: ", user.userName);
    console.log("사용자 역할: ", user.role);
    if (user.role !== 1) {
      navigate("/");
    }
  }, [user.role, navigate]);
  return (
    <Container className="products-users">
      <ul className="tabmenu">
        <li
          className={activeTab === "products" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            setActiveTab("products");
          }}
        >
          <a href="#">상품 관리</a> {/* href는 이제 아무 의미가 없음 */}
        </li>
        <li
          className={activeTab === "users" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            setActiveTab("users");
          }}
        >
          <a href="#">회원 관리</a>
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
