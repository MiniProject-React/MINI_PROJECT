import React, { useState, useEffect, useContext,} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../api/provider/UserContextProvider";
import { useLocation } from "react-router-dom";
import {
  PurchaseContainer,
  Title,
  Form,
  Label,
  Input,
  OrderInfo,
  SubmitButton,
} from "../styles/PurchasePageStyle01";

const PurchasePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const purchasePayload = location?.state || []; // purchasepayload 데이터를 받아옵니다.
  console.log(location);
  console.log(purchasePayload);

  // 상태 초기화
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const { user } = useContext(UserContext);



  // 주문 데이터 처리
  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    // 주문 상태 설정
    const orderStatus = "배송중"; // 주문 상태

    const orderData = {
      userEmail: user.email,
      name: name,
      phone: phone,
      email: email,
      postalCode: postalCode,
      address: address,
      cardNumber: cardNumber,
      status: orderStatus,
      items: purchasePayload,
    };

    // 주문을 처리하는 API 호출 예시
    const response = await fetch("http://localhost:8112/api/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.success) {
      // 주문 성공 시, 완료 페이지로 이동
      navigate("/orderConfirmation", { state: result.orderId });
    } else {
      // 실패 처리
      alert("주문 처리에 실패했습니다.");
    }
  };

  return (
    <PurchaseContainer>
      <Title>주문 정보 입력</Title>
      <Form onSubmit={handleOrderSubmit}>
        <Label>
          이름:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Label>
        <Label>
          연락처:
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Label>
        <Label>
          이메일:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <Label>
          주소:
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Label>
        <Label>
          우편번호:
          <Input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Label>
        <Label>
          카드 번호:
          <Input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </Label>
        <OrderInfo>
          {purchasePayload.map((item, index) => (
            <li key={index}>
              {item.productName} - 수량: {item.quantity} - 가격: {item.price}원
            </li>
          ))}
        </OrderInfo>
        <SubmitButton type="submit">주문하기</SubmitButton>
      </Form>
    </PurchaseContainer>
  );
};

export default PurchasePage;
