import React, { useState, useEffect } from "react";

const SuggestedPC = () => {
  const [pcs, setPcs] = useState([]); // 가격대별 PC 목록
  const [selectedPC, setSelectedPC] = useState(null); // 선택된 PC
  const [cart, setCart] = useState([]); // 장바구니
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계

  // 가격 포맷 (원화, 3자리마다 쉼표)
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  };

  // 가격대 버튼을 클릭했을 때 PC 목록을 불러오는 useEffect
  useEffect(() => {
    fetchPCs("70만원 미만"); // 초기값으로 70만원 미만 범위 불러오기
  }, []);

  // 가격대별 제품을 불러오는 함수
  const fetchPCs = (priceRange) => {
    const examplePCs = {
      "70만원 미만": [
        {
          id: 1,
          name: "PC1",
          price: 408000,
          cpu: "RYZEN 5500GT",
          motherboard: "ASUS Z390",
          ram: "8GB",
          vga: "없음",
          ssd: "256GB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 2,
          name: "PC2",
          price: 359000,
          cpu: "RYZEN 5500GT",
          motherboard: "MSI B450",
          ram: "8GB",
          vga: "없음",
          ssd: "128GB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0705/1158906/1158906_600.jpg",
        },
        {
          id: 3,
          name: "PC3",
          price: 431000,
          cpu: "RYZEN 3200G",
          motherboard: "Gigabyte B360M",
          ram: "16GB",
          vga: "없음",
          ssd: "500GB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0717/1161488/1161488_600.jpg",
        },
        {
          id: 4,
          name: "PC4",
          price: 384000,
          cpu: "RYZEN 8500G",
          motherboard: "ASUS H310M",
          ram: "8GB",
          vga: "없음",
          ssd: "480GB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1029/1185458/1185458_600.jpg",
        },
      ],
      "70만원 이상 ~ 80만원 미만": [
        {
          id: 5,
          name: "PC5",
          price: 757000,
          cpu: "RYZEN 5600",
          motherboard: "MSI Z390",
          ram: "16GB",
          vga: "GeForce RTX 3060",
          ssd: "500GB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0523/1146825/1146825_600.jpg",
        },
        {
          id: 6,
          name: "PC6",
          price: 780000,
          cpu: "RYZEN 5600",
          motherboard: "Gigabyte B450M",
          ram: "16GB",
          vga: "Radeon RX 7600",
          ssd: "500GB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0705/1158769/1158769_600.jpg",
        },
        {
          id: 7,
          name: "PC7",
          price: 704000,
          cpu: "RYZEN 5600",
          motherboard: "ASUS Z390",
          ram: "16GB",
          vga: "Radeon RX 6600",
          ssd: "512GB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1011/1180372/1180372_600.jpg",
        },
        {
          id: 8,
          name: "PC8",
          price: 790000,
          cpu: "RYZEN 7600",
          motherboard: "MSI B550",
          ram: "16GB",
          vga: "없음",
          ssd: "1TB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1015/1181529/1181529_600.jpg",
        },
      ],
      "80만원 이상 ~ 90만원 미만": [
        {
          id: 9,
          name: "PC9",
          price: 850000,
          cpu: "RYZEN 5600",
          motherboard: "Gigabyte Z490",
          ram: "16GB",
          vga: "GeForce RTX 4060",
          ssd: "1TB",
          hdd: "1TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0312/1123409/1123409_600.jpg",
        },
        {
          id: 10,
          name: "PC10",
          price: 880000,
          cpu: "RYZEN 5600",
          motherboard: "ASUS B550",
          ram: "16GB",
          vga: "GeForce RTX 4060",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0329/1129428/1129428_600.jpg",
        },
        {
          id: 11,
          name: "PC11",
          price: 890000,
          cpu: "RYZEN 5600",
          motherboard: "MSI Z590",
          ram: "16GB",
          vga: "GeForce RTX 4060",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0705/1158765/1158765_600.jpg",
        },
        {
          id: 12,
          name: "PC12",
          price: 895000,
          cpu: "RYZEN 5600",
          motherboard: "Gigabyte X570",
          ram: "32GB",
          vga: "GeForce RTX 4060",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0509/1142768/1142768_600.jpg",
        },
      ],
      "90만원 이상 ~ 100만원 미만": [
        {
          id: 13,
          name: "PC13",
          price: 950000,
          cpu: "RYZEN 5600",
          motherboard: "ASUS ROG",
          ram: "32GB",
          vga: "GeForce RTX 4060",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0819/1170004/1170004_600.jpg",
        },
        {
          id: 14,
          name: "PC14",
          price: 980000,
          cpu: "RYZEN 5600",
          motherboard: "MSI X570",
          ram: "32GB",
          vga: "GeForce RTX 4060",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0731/1164901/1164901_600.jpg",
        },
        {
          id: 15,
          name: "PC15",
          price: 990000,
          cpu: "RYZEN 5600",
          motherboard: "Gigabyte Z590",
          ram: "32GB",
          vga: "GeForce RTX 4060i",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0326/1127739/1127739_600.jpg",
        },
        {
          id: 16,
          name: "PC16",
          price: 987000,
          cpu: "RYZEN 8700G",
          motherboard: "ASUS ROG Crosshair",
          ram: "64GB",
          vga: "없음",
          ssd: "1TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0312/1123545/1123545_600.jpg",
        },
      ],
      "100만원 이상": [
        {
          id: 17,
          name: "PC17",
          price: 1907000,
          cpu: "RYZEN 9800X3D",
          motherboard: "ASUS Z590",
          ram: "64GB",
          vga: "Radeon 7700XT",
          ssd: "2TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1106/1187771/1187771_600.jpg",
        },
        {
          id: 18,
          name: "PC18",
          price: 1869000,
          cpu: "RYZEN 9800X3D",
          motherboard: "MSI MEG X570",
          ram: "64GB",
          vga: "Radeon 7700XT",
          ssd: "2TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1106/1187775/1187775_600.jpg",
        },
        {
          id: 19,
          name: "PC19",
          price: 2196000,
          cpu: "RYZEN 9600X",
          motherboard: "Gigabyte Z590",
          ram: "64GB",
          vga: "GeForce RTX 4070s",
          ssd: "2TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1008/1179436/1179436_600.jpg",
        },
        {
          id: 20,
          name: "PC20",
          price: 2439000,
          cpu: "RYZEN 7800X3D",
          motherboard: "ASUS ROG Crosshair",
          ram: "64GB",
          vga: "GeForce RTX 4070s",
          ssd: "2TB",
          hdd: "2TB",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/1203/1194029/1194029_600.jpg",
        },
      ],
    };

    setPcs(examplePCs[priceRange] || []); // 해당 가격대의 제품을 로드
  };

  // 제품을 선택하는 함수
  const handleSelectPC = (pc) => {
    setSelectedPC({ ...pc, quantity: 1 }); // 선택된 PC 설정 및 초기 수량 1로 설정
  };

  // 수량을 증가시키는 함수
  const increaseQuantity = () => {
    setSelectedPC((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  // 수량을 감소시키는 함수
  const decreaseQuantity = () => {
    if (selectedPC.quantity > 1) {
      setSelectedPC((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  // 장바구니에 추가하는 함수
  const addToCart = () => {
    if (selectedPC) {
      // 장바구니에 이미 선택된 PC가 있으면 수량만 업데이트
      const existingPC = cart.find((pc) => pc.id === selectedPC.id);
      if (existingPC) {
        setCart(
          cart.map((pc) =>
            pc.id === selectedPC.id
              ? { ...pc, quantity: pc.quantity + selectedPC.quantity }
              : pc
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, selectedPC]); // 기존 장바구니에 선택된 PC 추가
      }
      alert(`${selectedPC.name}가 장바구니에 추가되었습니다!`);
    }
  };

  // 장바구니에서 삭제하는 함수
  const removeFromCart = (pcId) => {
    setCart(cart.filter((pc) => pc.id !== pcId)); // 해당 PC를 장바구니에서 삭제
  };

  // 장바구니 전체 총 금액 계산
  const calculateCartTotalPrice = () => {
    return cart.reduce((total, pc) => total + pc.price * pc.quantity, 0);
  };

  const handleBuyNow = () => {
    alert("구매 페이지로 이동합니다.");
    // 구매 페이지로 이동하는 코드 작성 (예: 페이지 전환)
  };

  return (
    <div style={styles.container}>
      <h1>추천 PC</h1>

      <div style={styles.stepButtons}>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 0 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(0);
            fetchPCs("70만원 미만");
          }}
        >
          70만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 1 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(1);
            fetchPCs("70만원 이상 ~ 80만원 미만");
          }}
        >
          70만원 이상 ~ 80만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 2 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(2);
            fetchPCs("80만원 이상 ~ 90만원 미만");
          }}
        >
          80만원 이상 ~ 90만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 3 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(3);
            fetchPCs("90만원 이상 ~ 100만원 미만");
          }}
        >
          90만원 이상 ~ 100만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 4 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(4);
            fetchPCs("100만원 이상");
          }}
        >
          100만원 이상
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.pcList}>
          {pcs.map((pc) => (
            <div
              key={pc.id}
              style={styles.pcCard}
              onClick={() => handleSelectPC(pc)}
            >
              <img src={pc.image} alt={pc.name} style={styles.pcImage} />
              <h3>{pc.name}</h3>
              <p>{`가격: ${formatPrice(pc.price)}`}</p>
              <p>{`CPU: ${pc.cpu}`}</p>
              <p>{`MOTHERBOARD: ${pc.motherboard}`}</p>
              <p>{`RAM: ${pc.ram}`}</p>
              <p>{`VGA: ${pc.vga}`}</p>
              <p>{`SSD: ${pc.ssd}`}</p>
              <p>{`HDD: ${pc.hdd}`}</p>
            </div>
          ))}
        </div>

        <div style={styles.selectedPCContainer}>
          {selectedPC && (
            <div style={styles.selectedPC}>
              <h2>선택된 PC: {selectedPC.name}</h2>
              <img
                src={selectedPC.image}
                alt={selectedPC.name}
                style={styles.selectedPCImage}
              />
              <p>{`가격: ${formatPrice(selectedPC.price)}`}</p>
              <p>{`CPU: ${selectedPC.cpu}`}</p>
              <p>{`MOTHERBOARD: ${selectedPC.motherboard}`}</p>
              <p>{`RAM: ${selectedPC.ram}`}</p>
              <p>{`VGA: ${selectedPC.vga}`}</p>
              <p>{`SSD: ${selectedPC.ssd}`}</p>
              <p>{`HDD: ${selectedPC.hdd}`}</p>

              {/* 수량 조절 */}
              <div>
                <button style={styles.button} onClick={decreaseQuantity}>
                  -
                </button>
                <span style={styles.quantity}>{selectedPC.quantity}</span>
                <button style={styles.button} onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <h4>
                총 가격 : {formatPrice(selectedPC.price * selectedPC.quantity)}
              </h4>
              <button style={styles.cartbutton} onClick={addToCart}>
                장바구니에 추가
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 장바구니 출력 */}
      {cart.length > 0 && (
        <div style={styles.cart}>
          <h2>장바구니</h2>
          {cart.map((pc, index) => (
            <div key={index} style={styles.cartItem}>
              <h3>{pc.name}</h3>
              <img src={pc.image} alt={pc.name} style={styles.cartItemImage} />
              <p>{`CPU: ${pc.cpu}`}</p>
              <p>{`MOTHERBOARD: ${pc.motherboard}`}</p>
              <p>{`RAM: ${pc.ram}`}</p>
              <p>{`VGA: ${pc.vga}`}</p>
              <p>{`SSD: ${pc.ssd}`}</p>
              <p>{`HDD: ${pc.hdd}`}</p>
              <p>{`가격: ${formatPrice(pc.price)}`}</p>
              <p>{`수량: ${pc.quantity}`}</p>
              <h4>{`총 가격: ${formatPrice(pc.price * pc.quantity)}`}</h4>
              <button
                style={styles.removeButton}
                onClick={() => removeFromCart(pc.id)}
              >
                삭제
              </button>
            </div>
          ))}
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
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  stepButton: {
    padding: "16px",
    fontSize: "13px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    width: "200%",
    textAlign: "center",
  },
  stepButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px", // 버튼 사이 여백
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  pcList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    flexBasis: "65%",
  },
  selectedPCContainer: {
    flexBasis: "30%",
  },
  pcCard: {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
    cursor: "pointer",
  },
  pcImage: {
    width: "75%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  selectedPC: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  selectedPCImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "10px 0",
  },

  cartbutton: {
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "10px 0",
  },

  quantity: {
    fontSize: "18px",
    margin: "0 10px",
  },
  cart: {
    marginTop: "30px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
  },
  cartItem: {
    borderBottom: "1px solid #eee",
    padding: "10px 0",
    marginBottom: "10px",
  },
  cartItemImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  removeButton: {
    backgroundColor: "#FF0000",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
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

export default SuggestedPC;
