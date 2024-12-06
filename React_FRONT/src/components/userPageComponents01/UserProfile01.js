import React from "react";

const UserProfile01 = ({ user }) => {
  return (
    <div>
      <h2>개인 정보 조회/수정</h2>
      <p>이메일: {user.email}</p>
      <p>비밀번호: {user.password}</p>
      <p>이름: {user.username}</p>
      <p>주소: {user.address}</p>
      <p>전화번호: {user.phone_number}</p>
    </div>
  );
};

export default UserProfile01;
