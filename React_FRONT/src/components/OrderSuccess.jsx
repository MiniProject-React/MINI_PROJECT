import React from "react";
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  // useLocation 훅을 사용하여 이전 페이지에서 전달된 state 데이터 가져오기
  const location = useLocation();
  const { orderSummary, paymentInfo, shippingInfo } = location.state || {};

  // 주문 번호 생성 (오늘 날짜 + 현재시간 + 난수 코드)
  const generateOrderNumber = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0].replace(/-/g, "");
    const time = now.toTimeString().split(" ")[0].replace(/:/g, "");
    const randomCode = Math.floor(1000 + Math.random() * 9000); // 1000부터 9999 사이의 난수 생성
    return `${date}-${time}-${randomCode}`;
  };
  // 주문 번호 생성
  const orderNumber = generateOrderNumber();

  // 카드 번호 중간 8자리를 마스킹하는 함수
  const maskCardNumber = (cardNumber) => {
    return cardNumber.replace(/\d(?=\d{4})/g, "*");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>주문 완료</h1>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 번호: {orderNumber}</h2>
      </section>
      <h1 style={styles.Header}>구매가 정상적으로 완료되었습니다.</h1>
      <p style={styles.subHeader}>구매해주셔서 감사드립니다.</p>

      <div style={styles.card}>
        {/* 주문 정보 섹션 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>주문 정보</h2>
          <p>주문 번호: {orderSummary?.orderId}</p>
          <p>총액: ₩{orderSummary?.total}</p>
        </section>
      </div>

      <div style={styles.card}>
        {/* 결제 정보 섹션 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>결제 정보</h2>
          <p>결제 수단: {paymentInfo?.paymentMethod}</p>
          {paymentInfo?.paymentMethod === "신용카드" && (
            <p>카드 번호: {maskCardNumber(paymentInfo.cardNumber)}</p>
          )}
          {paymentInfo?.paymentMethod === "TOSS" && <p>TOSS 결제 완료</p>}
        </section>
      </div>

      <div style={styles.card}>
        {/* 배송 정보 섹션 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>배송 정보</h2>
          <p>이름: {shippingInfo?.name}</p>
          <p>연락처: {shippingInfo?.phone}</p>
          <p>주소: {shippingInfo?.address}</p>
        </section>
      </div>
    </div>
  );
};

// 스타일 객체
const styles = {
  Header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#666",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "30px",
  },
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "40px",
    fontSize: "2em",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.4em",
    color: "#333",
    fontWeight: "600",
    marginBottom: "10px",
  },
};

export default OrderSuccess;
