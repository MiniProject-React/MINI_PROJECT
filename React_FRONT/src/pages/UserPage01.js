import { useState } from "react";
import UserCart01 from "../components/userPageComponents01/UserCart01";
import UserProfile01 from "../components/userPageComponents01/UserProfile01";
import OrderHistory01 from "../components/userPageComponents01/OrderHistory01";
import ReviewWriting01 from "../components/userPageComponents01/ReviewWriting01";
import ReviewList01 from "../components/userPageComponents01/ReviewList01";
import {
  Container,
  Sidebar,
  MenuItem,
  Content,
} from "../styles/UserPageStyle01";

const UserPage01 = () => {
  const [selectedMenu, setSelectedMenu] = useState("cart");

  const user = {
    // 임시 회원정보
    user_id: "1",
    username: "testuser",
    password: "abc123",
    email: "testuser@example.com",
    address: "123 Test Street, Test City",
    phone_number: "010-1234-5678",
    role: "USER",
  };

  // 컴포넌트 불러오기
  const renderComponent = () => {
    switch (selectedMenu) {
      case "cart":
        return <UserCart01 user={user} />;
      case "orderHistory":
        return <OrderHistory01 user={user} />;
      case "reviewHistory":
        return <ReviewList01 user={user} />;
      case "profile":
        return <UserProfile01 user={user} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Sidebar>
        <MenuItem onClick={() => setSelectedMenu("cart")}>장바구니</MenuItem>
        <MenuItem onClick={() => setSelectedMenu("orderHistory")}>
          주문 내역
        </MenuItem>
        <MenuItem onClick={() => setSelectedMenu("reviewHistory")}>
          리뷰 목록
        </MenuItem>
        <MenuItem onClick={() => setSelectedMenu("profile")}>
          개인 정보 조회/수정
        </MenuItem>
      </Sidebar>
      <Content>{renderComponent()}</Content>
    </Container>
  );
};

export default UserPage01;
