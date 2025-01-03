import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 카드 유형을 인식하는 함수
const getCardType = (cardNumber) => {
  const amexRegex = /^(34|37)/;
  const shinhanRegex = /^3/;
  const visaRegex = /^4/;
  const masterCardRegex = /^5/;

  if (amexRegex.test(cardNumber)) {
    return "American Express";
  } else if (shinhanRegex.test(cardNumber)) {
    return "Shinhan";
  } else if (visaRegex.test(cardNumber)) {
    return "VISA";
  } else if (masterCardRegex.test(cardNumber)) {
    return "MasterCard";
  } else {
    return null;
  }
};

// 가격 포맷 (원화, 3자리마다 쉼표)
const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return "₩0";
  }
  return price.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
};

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전달받은 장바구니 데이터 (상태)
  const ownPCCart = location.state?.ownPCCart || [];
  const suggestedPCCart = location.state?.suggestedPCCart || [];

  // 주문 정보 상태 설정
  const [orderSummary, setOrderSummary] = useState({
    items: [
      ...ownPCCart.map((pc, index) => ({
        configuration: `구성 ${index + 1}`,
        parts: Object.entries(pc).map(([category, part]) => ({
          name: `${category.toUpperCase()} - ${part.name}`,
          quantity: part.quantity,
          price: part.price || 0, // Ensure price is always defined
        })),
      })),
      ...suggestedPCCart.map((pc, index) => ({
        configuration: `PC ${index + 1}`,
        parts: [
          {
            name: `PC ${index + 1}`,
            quantity: pc.quantity,
            price: pc.price || 0, // Ensure price is always defined
          },
        ],
      })),
    ],
    shippingCost: 3000, // 배송비
    discount: 0, // 할인
    tax: 0, // 세금
    total: 0, // 총액
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    CVC: "",
    password: "",
    paymentMethod: "신용카드",
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    emailDomain: "@gmail.com", // 이메일 도메인 기본값 설정
  });

  const [message, setMessage] = useState("");
  const [cardType, setCardType] = useState(null);

  // 주문 정보 계산
  const calculateTotal = () => {
    const subtotal = orderSummary.items.reduce(
      (sum, item) =>
        sum +
        item.parts.reduce(
          (partSum, part) => partSum + (part.price || 0) * part.quantity,
          0
        ),
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

  // 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤을 위해 'smooth' 설정
    });
  }, []); // 빈 배열로 컴포넌트가 마운트될 때만 실행되도록 함

  useEffect(() => {
    calculateTotal();
  }, [
    orderSummary.items,
    orderSummary.shippingCost,
    orderSummary.tax,
    orderSummary.discount,
  ]);

  // 카드 번호 변경 처리 (하이픈 기능)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formatted = value.replace(/(\d{4})(?=\d)/g, "$1-").trim();
      setPaymentInfo((prevState) => ({
        ...prevState,
        cardNumber: formatted,
      }));
    }

    const type = getCardType(value);
    setCardType(type);
  };

  // 연락처 입력 처리 함수 (하이픈 기능)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 남기고 제거
    let formatted = value;

    if (value.length >= 4 && value.length <= 7) {
      formatted = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length >= 8) {
      formatted = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }

    setShippingInfo((prevState) => ({
      ...prevState,
      phone: formatted,
    }));
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

  // 이메일 도메인 변경 핸들러
  const handleEmailDomainChange = (e) => {
    setShippingInfo((prevState) => ({
      ...prevState,
      emailDomain: e.target.value,
    }));
  };

  // 결제 처리
  const handlePlaceOrder = () => {
    if (
      paymentInfo.paymentMethod === "신용카드" &&
      (!paymentInfo.cardNumber ||
        !paymentInfo.expiryMonth ||
        !paymentInfo.expiryYear ||
        !paymentInfo.CVC)
    ) {
      setMessage("결제 정보를 모두 입력해주세요.");
      return;
    }

    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      setMessage("배송 정보를 모두 입력해주세요.");
      return;
    }

    setMessage("결제 중입니다...");

    // 주문 정보 및 결제 정보를 state로 전달
    navigate("/order-success", {
      state: {
        orderSummary,
        paymentInfo,
        shippingInfo,
      },
    });
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
          onChange={handlePhoneChange} // 핸들러 수정
          style={styles.input}
          required
          maxLength={13}
        />
        <label>이메일:</label>
        <div style={styles.emailContainer}>
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            style={styles.input}
            required
          />
          <select
            value={shippingInfo.emailDomain}
            onChange={handleEmailDomainChange}
            style={styles.select}
          >
            <option value="@gmail.com">@gmail.com</option>
            <option value="@naver.com">@naver.com</option>
            <option value="@kakao.com">@kakao.com</option>
          </select>
        </div>
        <label>우편번호:</label>
        <input
          type="text"
          name="postalCode"
          value={shippingInfo.postalCode}
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
      </section>

      {/* 주문 정보 (Order Summary) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 정보</h2>
        {orderSummary.items.map((item, index) => (
          <div key={index} style={styles.configurationBox}>
            <h3>{item.configuration}</h3>
            <ul style={styles.list}>
              {item.parts.map((part, partIndex) => (
                <li key={partIndex} style={styles.listItem}>
                  <p>제품명: {part.name}</p>
                  <p>수량: {part.quantity}</p>
                  <p>가격: {formatPrice(part.price)}</p>
                </li>
              ))}
            </ul>
            <p style={styles.summary}>
              소계:{" "}
              {formatPrice(
                item.parts.reduce(
                  (sum, part) => sum + (part.price || 0) * part.quantity,
                  0
                )
              )}
            </p>
          </div>
        ))}
        <p>배송비: {formatPrice(orderSummary.shippingCost)}</p>
        <p>총액: {formatPrice(orderSummary.total)}</p>
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
          <option value="가상화폐">가상화폐</option>
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
              <div style={styles.cardTypeBox}>
                <strong>카드 타입 : </strong>
                <span>&nbsp;{cardType}</span>
                <img
                  src={`/images/${cardType.toLowerCase()}.png`}
                  alt={cardType}
                  style={{
                    width: "50px",
                    height: "auto",
                    marginLeft: "10px",
                  }}
                />
              </div>
            )}

            <label>유효 기간:</label>
            <div style={styles.expiryBox}>
              <input
                type="text"
                name="expiryMonth"
                value={paymentInfo.expiryMonth}
                onChange={handlePaymentChange}
                style={{ ...styles.input, width: "48%" }}
                placeholder="MM"
                maxLength={2}
                required
              />
              <div style={styles.slash}>/</div>
              <input
                type="text"
                name="expiryYear"
                value={paymentInfo.expiryYear}
                onChange={handlePaymentChange}
                style={{ ...styles.input, width: "48%" }}
                placeholder="YY"
                maxLength={2}
                required
              />
            </div>

            <label>비밀번호:</label>
            <input
              type="text"
              name="pwd"
              value={paymentInfo.pwd}
              onChange={handlePaymentChange}
              style={styles.pwdInput}
              maxLength={2}
              required
            />
            <span style={styles.maskBox}>**</span>

            <label>CVC:</label>
            <input
              type="text"
              name="CVC"
              value={paymentInfo.CVC}
              onChange={handlePaymentChange}
              style={styles.cvcInput}
              maxLength={3}
              required
            />
          </div>
        )}
      </section>

      {/* 메시지 출력 */}
      {message && <p style={styles.message}>{message}</p>}

      {/* 주문 버튼 */}
      <div style={styles.orderButtonContainer}>
        <button onClick={handlePlaceOrder} style={styles.orderButton}>
          주문하기
        </button>
      </div>
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
    marginBottom: "20px"
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "1.5em",
    color: "#333",
    marginBottom: "20px"
  },
  input: {
    width: "97%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  emailContainer: {
    display: "flex",
    alignItems: "center",
  },
  pwdInput: {
    width: "2%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginLeft: "10px",
    marginRight: "10px", // 마스킹 박스와 간격
  },
  maskBox: {
    marginLeft: "-5px",
    marginRight: "20px", // CVC와 간격
  },
  cvcInput: {
    width: "3%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  expiryBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slash: {
    fontSize: "2em",
    marginBottom: "20px",
    alignSelf: "center",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    borderBottom: "1px solid #eee",
    padding: "10px 0",
  },
  summary: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  configurationBox: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
  },
  cardTypeBox: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",
    padding: "15px 30px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2em",
    width: "100%",
  },
  message: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },

  orderButtonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },

  orderButton: {
    textAlign: "center",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
};

export default Order;
