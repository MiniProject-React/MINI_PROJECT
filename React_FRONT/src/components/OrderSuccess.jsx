import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // 주문 번호 생성 (오늘 날짜 + 현재시간 조합)
  const generateOrderNumber = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0].replace(/-/g, "");
    const time = now.toTimeString().split(" ")[0].replace(/:/g, "");
    return `${date}-${time}`;
  };

  // 더미 데이터 (배송지 정보, 결제 정보)
  const [shippingInfo, setShippingInfo] = useState({
    name: "AAA",
    phone: "010-1234-5678",
    email: "AAA@gmail.com",
    address: "서울특별시 ",
    city: "서울",
    postalCode: "12345",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "1234-5678-9876-5432",
    paymentMethod: "신용카드",
  });

  // 주문 번호 생성
  const orderNumber = generateOrderNumber();

  // 카드 번호 마스킹 함수
  const maskCardNumber = (cardNumber) => {
    const cardParts = cardNumber.split("-");
    const maskedPart = cardParts[1] + "-" + cardParts[2]; // 중간 8자리 마스킹
    return `${cardParts[0]}-****-****-${cardParts[3]}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>구매가 정상적으로 완료되었습니다.</h1>
      <p style={styles.subHeader}>구매해주셔서 감사드립니다.</p>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 번호: {orderNumber}</h2>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>배송지 정보</h2>
        <p>
          <strong>이름:</strong> {shippingInfo.name}
        </p>
        <p>
          <strong>연락처:</strong> {shippingInfo.phone}
        </p>
        <p>
          <strong>이메일:</strong> {shippingInfo.email}
        </p>
        <p>
          <strong>주소:</strong> {shippingInfo.address}
        </p>
        <p>
          <strong>우편번호:</strong> {shippingInfo.postalCode}
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>결제 정보</h2>
        <p>
          <strong>결제 수단:</strong> {paymentInfo.paymentMethod}
        </p>
        <p>
          <strong>카드 번호:</strong> {maskCardNumber(paymentInfo.cardNumber)}
        </p>
      </section>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate("/")} style={styles.button}>
          메인페이지로 돌아가기
        </button>
        <button onClick={() => navigate("/own-pc")} style={styles.button}>
          커스텀PC 페이지로 돌아가기
        </button>
        <button onClick={() => navigate("/suggested-pc")} style={styles.button}>
          추천PC 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "20px",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  buttonContainer: {
    marginTop: "30px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    margin: "10px",
    width: "250px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};

export default OrderSuccess;
