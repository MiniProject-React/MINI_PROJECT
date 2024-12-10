import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 카드 유형을 인식하는 함수
const getCardType = (cardNumber) => {
  const amexRegex = /^(34|37)/; // American Express는 34 또는 37로 시작
  const shinhanRegex = /^3/; // Shinhan은 3으로 시작
  const visaRegex = /^4/; // VISA는 4로 시작
  const masterCardRegex = /^5/; // MasterCard는 5로 시작

  if (amexRegex.test(cardNumber)) {
    return "American Express"; // American Express가 우선
  } else if (shinhanRegex.test(cardNumber)) {
    return "Shinhan"; // 그 다음 Shinhan 카드
  } else if (visaRegex.test(cardNumber)) {
    return "VISA"; // VISA
  } else if (masterCardRegex.test(cardNumber)) {
    return "MasterCard"; // MasterCard
  } else {
    return null; // 카드 유형을 인식할 수 없을 경우
  }
};
const Order = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState({
    items: [
      {
        name: "A",
        quantity: 1,
        price: 100,
        options: "a",
      },
      {
        name: "A",
        quantity: 2,
        price: 200,
        options: "a",
      },
    ],
    shippingCost: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    CVC: "",
    paymentMethod: "신용카드", // 기본 결제 수단
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [message, setMessage] = useState("");
  const [cardType, setCardType] = useState(null);

  // 주문 정보 계산
  const calculateTotal = () => {
    const subtotal = orderSummary.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total =
      subtotal +
      orderSummary.shippingCost +
      orderSummary.tax -
      orderSummary.discount;
    setOrderSummary((prevState) => ({
      ...prevState,
      total: total,
    }));
  };

  useEffect(() => {
    calculateTotal();
  }, [
    orderSummary.items,
    orderSummary.shippingCost,
    orderSummary.tax,
    orderSummary.discount,
  ]);

  // 카드 번호 변경 처리
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setPaymentInfo((prevState) => ({
      ...prevState,
      cardNumber: value,
    }));

    const type = getCardType(value);
    setCardType(type);
  };

  // 결제 정보 핸들러
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 배송 정보 핸들러
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 결제 처리
  const handlePlaceOrder = () => {
    if (
      !paymentInfo.cardNumber ||
      !paymentInfo.expiryDate ||
      !paymentInfo.CVC
    ) {
      setMessage("결제 정보를 모두 입력해주세요.");
      return;
    }
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      setMessage("배송 정보를 모두 입력해주세요.");
      return;
    }
    setMessage("결제 중입니다...");

    // 결제 API 호출
    setTimeout(() => {
      navigate("/order-success");
      setMessage("주문이 완료되었습니다!");
    }, 2000); // 2초 후 주문 완료 메시지
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>주문 페이지</h1>

      {/* 배송 정보 (Shipping Information) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>배송 정보</h2>
        <label>이름:</label>
        <input
          type="text"
          name="name"
          value={shippingInfo.name}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>연락처:</label>
        <input
          type="text"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>이메일:</label>
        <input
          type="email"
          name="email"
          value={shippingInfo.email}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>주소:</label>
        <input
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>우편번호:</label>
        <input
          type="text"
          name="postalCode"
          value={shippingInfo.postalCode}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
      </section>

      {/* 주문 정보 (Order Summary) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 정보</h2>
        <ul style={styles.list}>
          {orderSummary.items.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <p>{item.name}</p>
              <p>수량: {item.quantity}</p>
              <p>가격: ₩{item.price}</p>
              <p>옵션: {item.options}</p>
            </li>
          ))}
        </ul>
        <p style={styles.summary}>
          소계: ₩
          {orderSummary.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </p>
        <p>배송비: ₩{orderSummary.shippingCost}</p>
        <p>총액: ₩{orderSummary.total}</p>
      </section>

      {/* 결제 정보 (Payment Information) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>결제 정보</h2>
        <label>결제 수단:</label>
        <select
          name="paymentMethod"
          value={paymentInfo.paymentMethod}
          onChange={handlePaymentChange}
          style={styles.select}
        >
          <option value="신용카드">신용카드</option>
          <option value="계좌이체">계좌이체</option>
          <option value="TOSS">TOSS</option>
        </select>

        {paymentInfo.paymentMethod === "신용카드" && (
          <div>
            <label>카드 번호:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              style={styles.input}
              maxLength={19}
              placeholder="카드 번호를 입력하세요"
              required
            />
            {cardType && (
              <div>
                <strong>카드 타입: </strong>
                <span>{cardType}</span>
                <img
                  src={`/images/${cardType.toLowerCase()}.png`} // 예: "visa.png", "mastercard.png"
                  alt={cardType}
                  style={{
                    width: "50px",
                    height: "auto",
                    marginLeft: "10px",
                  }}
                />
              </div>
            )}
            {/*
                Shinhan: 카드 번호가 3으로 시작 
                VISA: 카드 번호가 4로 시작
                MasterCard: 카드 번호가 5로 시작
                American Express: 카드 번호가 34 또는 37로 시작
                이 정보를 바탕으로, 입력된 카드 번호에 따라 적절한 카드를 구별할 수 있습니다. */}

            <label>유효 기간 (MM/YY):</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handlePaymentChange}
              style={styles.input}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
            <label>CVC:</label>
            <input
              type="text"
              name="CVC"
              value={paymentInfo.CVC}
              onChange={handlePaymentChange}
              style={styles.input}
              maxLength={3}
              required
            />
          </div>
        )}
      </section>

      {/* 결제 버튼 */}
      <section style={styles.section}>
        <button onClick={handlePlaceOrder} style={styles.button}>
          결제하기
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </section>
    </div>
  );
};

const styles = {
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
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "1.5em",
    color: "#333",
  },
  input: {
    width: "97%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  select: {
    width: "99%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2em",
    width: "100%",
  },
  message: {
    color: "#d9534f",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    padding: "10px 0",
  },
  summary: {
    fontWeight: "bold",
  },
};

export default Order;
