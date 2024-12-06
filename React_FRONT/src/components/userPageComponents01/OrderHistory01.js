import React from "react";

const OrderHistory01 = ({ user }) => {
  return (
    <div>
      <h2>주문 내역</h2>
      <p>{user.username}님의 주문 내역을 불러옵니다...</p>
    </div>
  );
};

export default OrderHistory01;
