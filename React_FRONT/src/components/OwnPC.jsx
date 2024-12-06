import React, { useState } from "react";

const OwnPC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계
  const [selectedParts, setSelectedParts] = useState({}); // 선택된 부품
  const [cart, setCart] = useState([]); // 장바구니 상태

  // 가격 포맷 (원화, 3자리마다 쉼표)
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  };

  // 각 부품에 대한 선택지와 가격
  const partsOptions = [
    {
      category: "cpu",
      options: [
        { name: "RYZEN 5600", price: 129000, image: "/images/cpu1.jpg" },
        { name: "RYZEN 5600G", price: 169000, image: "/images/cpu2.jpg" },
        { name: "RYZEN 5600X", price: 179000, image: "/images/cpu3.jpg" },
        { name: "RYZEN 7600", price: 242000, image: "/images/cpu4.jpg" },
        { name: "RYZEN 5700G", price: 265000, image: "/images/cpu5.jpg" },
        { name: "RYZEN 5800XT", price: 384000, image: "/images/cpu6.jpg" },
      ],
    },
    {
      category: "motherboard",
      options: [
        {
          name: "GIGABYTE A520M",
          price: 64000,
          image: "/images/motherboard1.jpg",
        },
        {
          name: "GIGABYTE B550M",
          price: 126000,
          image: "/images/motherboard2.jpg",
        },
        {
          name: "GIGABYTE B650M",
          price: 154000,
          image: "/images/motherboard3.jpg",
        },
        {
          name: "GIGABYTE A620M",
          price: 174000,
          image: "/images/motherboard4.jpg",
        },
        {
          name: "GIGABYTE X570",
          price: 237000,
          image: "/images/motherboard5.jpg",
        },
        {
          name: "GIGABYTE X670",
          price: 377000,
          image: "/images/motherboard6.jpg",
        },
      ],
    },
    {
      category: "ram",
      options: [
        {
          name: "SAMSUNG DDR4 PC4-21300 8GB",
          price: 18000,
          image: "/images/ram1.jpg",
        },
        {
          name: "SAMSUNG DDR4 PC4-25600 4GB",
          price: 19000,
          image: "/images/ram2.jpg",
        },
        {
          name: "SAMSUNG DDR4 PC4-25600 8GB",
          price: 21000,
          image: "/images/ram3.jpg",
        },
        {
          name: "SAMSUNG DDR5 PC5-44800 8GB",
          price: 38000,
          image: "/images/ram4.jpg",
        },
        {
          name: "SAMSUNG DDR4 PC4-21300 서버용 32GB",
          price: 63000,
          image: "/images/ram5.jpg",
        },
        {
          name: "SAMSUNG DDR5 PC5-38400 16GB",
          price: 77000,
          image: "/images/ram6.jpg",
        },
      ],
    },
    {
      category: "vga",
      options: [
        {
          name: "[GIGABYTE] GeForce RTX 4060 WINDFORCE OC D6 8GB 피씨디렉트",
          price: 425000,
          image: "/images/vga1.jpg",
        },
        {
          name: "[GIGABYTE] GeForce RTX 4060 Ti WINDFORCE OC D6 8GB 피씨디렉트",
          price: 579000,
          image: "/images/vga2.jpg",
        },
        {
          name: "[GIGABYTE] GeForce RTX 4070 SUPER Gaming OC D6X 12GB 피씨디렉트",
          price: 1029000,
          image: "/images/vga3.jpg",
        },
        {
          name: "[GIGABYTE] GeForce RTX 4070 Ti SUPER WINDFORCE OC D6X 16GB 피씨디렉트",
          price: 1250000,
          image: "/images/vga4.jpg",
        },
        {
          name: "[GIGABYTE] GeForce RTX 4080 SUPER AERO OC D6X 16GB 피씨디렉트",
          price: 1749000,
          image: "/images/vga5.jpg",
        },
        {
          name: "[GIGABYTE] GeForce RTX 4090 Gaming OC D6X 24GB 피씨디렉트",
          price: 3450000,
          image: "/images/vga6.jpg",
        },
      ],
    },
    {
      category: "ssd",
      options: [
        {
          name: "[삼성전자] 공식인증 870 EVO SATA 250GB",
          price: 73000,
          image: "/images/ssd1.jpg",
        },
        {
          name: "[삼성전자] 공식인증 980 M.2 NVMe 2280 250GB",
          price: 78000,
          image: "/images/ssd2.jpg",
        },
        {
          name: "[삼성전자] 공식인증 970 EVO Plus M.2 NVMe 2280 250GB",
          price: 81500,
          image: "/images/ssd3.jpg",
        },
        {
          name: "[삼성전자] 공식인증 870 QVO SATA 1TB",
          price: 162500,
          image: "/images/ssd4.jpg",
        },
        {
          name: "[삼성전자] 공식인증 980 PRO M.2 NVMe 2280 1TB",
          price: 208000,
          image: "/images/ssd5.jpg",
        },
        {
          name: "[삼성전자] 공식인증 990 PRO M.2 NVMe 2280 1TB",
          price: 218000,
          image: "/images/ssd6.jpg",
        },
      ],
    },
    {
      category: "hdd",
      options: [
        {
          name: "[Western Digital] BLUE HDD 1TB",
          price: 81000,
          image: "/images/hdd1.jpg",
        },
        {
          name: "[Western Digital] MOBILE BLUE HDD 2TB",
          price: 125000,
          image: "/images/hdd2.jpg",
        },
        {
          name: "[Western Digital] RED PLUS HDD 3TB",
          price: 135000,
          image: "/images/hdd3.jpg",
        },
        {
          name: "[Western Digital] RED PRO HDD 2TB",
          price: 169000,
          image: "/images/hdd4.jpg",
        },
        {
          name: "[Western Digital] Ultrastar HDD 20TB",
          price: 749000,
          image: "/images/hdd5.jpg",
        },
        {
          name: "[Western Digital] Ultrastar HDD 24TB",
          price: 909000,
          image: "/images/hdd6.jpg",
        },
      ],
    },
  ];

  // 부품 선택 처리
  const handleSelectPart = (category, part) => {
    setSelectedParts({
      ...selectedParts,
      [category]: { ...part, quantity: 1 }, // 수량 1로 설정
    });
    setCurrentStep((prevStep) => prevStep + 1); // 다음 단계로 이동
  };

  // 수량 변경 처리
  const handleQuantityChange = (category, delta) => {
    setSelectedParts((prevParts) => {
      const updatedPart = { ...prevParts[category] };
      updatedPart.quantity += delta;
      if (updatedPart.quantity < 1) updatedPart.quantity = 1; // 최소 수량은 1
      return {
        ...prevParts,
        [category]: updatedPart,
      };
    });
  };

  // 장바구니에 추가
  const addToCart = () => {
    if (Object.keys(selectedParts).length === partsOptions.length) {
      setCart((prevCart) => [...prevCart, { ...selectedParts }]);
      alert("구성이 장바구니에 추가되었습니다!");
      setSelectedParts({}); // 선택된 부품 초기화
      setCurrentStep(0); // 초기화
    } else {
      const missingParts = partsOptions.filter(
        (part) => !selectedParts[part.category]
      );
      if (missingParts.length > 0) {
        alert(
          `${missingParts[0].category.toUpperCase()} 부품을 선택하지 않았습니다.`
        );
        const missingPartCategory = missingParts[0].category;
        const stepIndex = partsOptions.findIndex(
          (part) => part.category === missingPartCategory
        );
        setCurrentStep(stepIndex); // 해당 부품 탭으로 이동
      } else {
        alert("모든 항목을 선택해 주세요.");
      }
    }
  };

  // 장바구니에서 항목 제거
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // 총 가격 계산
  const calculateTotalPrice = (config) => {
    return Object.values(config).reduce(
      (sum, part) => sum + part.price * part.quantity, // 수량 반영
      0
    );
  };

  // 장바구니 전체 총 금액 계산
  const calculateCartTotalPrice = () => {
    return cart.reduce((total, pc) => total + calculateTotalPrice(pc), 0);
  };

  // 선택된 부품 순서
  const selectedPartOrder = ["cpu", "motherboard", "ram", "vga", "ssd", "hdd"];

  const handleBuyNow = () => {
    alert("구매 페이지로 이동합니다.");
    // 구매 페이지로 이동하는 코드 작성 (예: 페이지 전환)
  };

  return (
    <div style={styles.container}>
      <h1>단계별 커스텀 PC</h1>

      <div style={styles.stepButtons}>
        {partsOptions.map((part, index) => (
          <button
            key={part.category}
            onClick={() => setCurrentStep(index)}
            style={{
              ...styles.stepButton,
              backgroundColor: currentStep === index ? "#ddd" : "#f4f4f4",
            }}
          >
            {part.category.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.stepContainer}>
          <h2>부품 선택</h2>
          {currentStep < partsOptions.length && (
            <div style={styles.optionList}>
              {partsOptions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSelectPart(partsOptions[currentStep].category, option)
                  }
                  style={styles.optionButton}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    style={styles.optionImage}
                  />
                  <div>
                    {option.name} ({formatPrice(option.price)})
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={styles.summaryContainer}>
          <h2>선택된 구성</h2>
          <div style={styles.selectedParts}>
            {selectedPartOrder.map(
              (category) =>
                selectedParts[category] && (
                  <div key={category} style={styles.selectedItem}>
                    <strong>{category.toUpperCase()}:</strong>{" "}
                    {selectedParts[category].name} (
                    {formatPrice(selectedParts[category].price)}))
                    <div>
                      <button
                        onClick={() => handleQuantityChange(category, -1)}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span>{selectedParts[category].quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(category, 1)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
          <h3>총 가격: {formatPrice(calculateTotalPrice(selectedParts))}</h3>
        </div>
      </div>

      <div style={styles.cartButtonContainer}>
        <button onClick={addToCart} style={styles.cartButton}>
          장바구니에 추가
        </button>
      </div>

      {cart.length > 0 && (
        <div style={styles.cart}>
          <h3>장바구니</h3>
          <ul>
            {cart.map((pc, index) => (
              <li key={index}>
                <h4>구성 {index + 1}:</h4>
                <ul>
                  {selectedPartOrder.map((category) => (
                    <li key={category}>
                      <strong>{category.toUpperCase()}:</strong>{" "}
                      {pc[category]?.name} ({formatPrice(pc[category].price)})
                      <div>수량: {pc[category]?.quantity}</div>
                      <h5>
                        가격:{" "}
                        {formatPrice(
                          pc[category]?.price * pc[category]?.quantity
                        )}
                      </h5>
                    </li>
                  ))}
                </ul>
                <h4>총 가격: {formatPrice(calculateTotalPrice(pc))}</h4>
                <button
                  onClick={() => removeFromCart(index)}
                  style={styles.removeButton}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
          <h3>
            전체 장바구니 총 가격: {formatPrice(calculateCartTotalPrice())}
          </h3>
          <button onClick={handleBuyNow} style={styles.buyButton}>
            구매하기
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  stepButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  stepButton: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    width: "200%",
    textAlign: "center",
  },

  stepContainer: {
    flex: 1,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
    marginRight: "20px",
  },
  optionList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px",
  },
  optionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "5px",
    textAlign: "center",
  },
  optionImage: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
    objectFit: "cover",
  },
  summaryContainer: {
    flex: 1,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  selectedParts: {
    marginBottom: "20px",
  },
  selectedItem: {
    marginBottom: "10px",
  },
  cartButtonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  cartButton: {
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  cart: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  removeButton: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quantityButton: {
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "none",
  },
  buyButton: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default OwnPC;
