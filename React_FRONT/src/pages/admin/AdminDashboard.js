import React from "react";
import AdminHome from "./AdminHome";
import { AdminUsersMap } from "../../api/provider/UserSearchContextProvider";
import { Routes, Route, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>관리자 대시보드</h1>
      <a href="/admin"> 관리자 페이지로 이동</a>
      <a herf="/admin/users"> 회원 정보 조회</a>
      <Routes>
        {/* 관리자 대시보드 내 라우트 */}
        <Route path="/" element={<AdminHome />} />
        <Route path="/users" element={<AdminUsersMap />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
