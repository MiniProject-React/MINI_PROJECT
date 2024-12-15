import React, { useContext, useState } from "react";
import ProductListComponent01 from "./ownPcComponents01/ProductListComponent01";
import { UserContext } from "../api/provider/UserContextProvider";
import { useNavigate } from "react-router-dom";
import "../css/OwnPc.css";
import axios from "axios";

const OwnPc = () => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isTabCompleted, setIsTabCompleted] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1); // 주문 갯수 상태
  const navigate = useNavigate();
  const MINI_DOMAIN = "http://localhost:8112";

  const { user } = useContext(UserContext);

  // 카테고리 ID와 이름 매핑
  const categoryMap = {
    1: "CPU",
    2: "GPU",
    3: "메인보드",
    4: "RAM",
    5: "SSD",
    6: "파워",
  };

  // 선택된 부품 정보를 리스트로 변환
  const getSelectedProductsList = () => {
    return Object.entries(selectedProducts).map(([categoryId, product]) => ({
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
    }));
  };

  // 총합 가격 계산
  const calculateTotalPrice = () => {
    const basePrice = Object.values(selectedProducts).reduce(
      (total, product) => total + product.price,
      0
    );
    return basePrice * orderQuantity; // 주문 갯수에 따라 총합 가격 계산
  };

  const handleProductSelection = (product, productId, selectedQuantity) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedProducts = { ...prevSelectedProducts };
      
      
      updatedProducts[product.CATEGORY_ID] = {
        productId: product.PRODUCT_ID,
        productName: product.NAME,
        quantity: selectedQuantity,
        price: product.PRICE * selectedQuantity,
      };
  
      // 선택이 완료되었는지 최신 상태로 확인
      const allSelected = Object.keys(categoryMap).every(
        (categoryId) => updatedProducts[categoryId]
      );
      setIsTabCompleted(allSelected);
  
      return updatedProducts;
    });
  };

  const handleCartButtonClick = async () => {
    if (!user.isLogin) {
      alert("로그인 후 사용 가능합니다.");
      navigate("/login");
      return;
    }
  
    const payload = {
      userEmail: user.email,
      totalPrice: calculateTotalPrice(),
      productDetails: getSelectedProductsList().map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
    };
  
    try {
      // Step 1: CUSTOM_ORDERS 테이블에 주문 생성
      const response = await axios.post(`${MINI_DOMAIN}/custom/create`, payload);
      const customId = response.data.customId;
  
      // Step 2: CART_ITEMS 테이블에 데이터 추가
      await axios.post(`${MINI_DOMAIN}/custom/addingCart`, {
        userEmail: user.email,
        customId,
        quantity: orderQuantity,
      });
      setSelectedProducts({}); 
      alert("장바구니에 추가되었습니다!");
    } catch (error) {
      console.error("Error adding to cart:", error.response || error.message);
      alert("장바구니 추가에 실패했습니다.");
    }
  };
  
  
  const handlePurchaseButtonClick = async () => {
    if (!user.isLogin) {
      alert("로그인 후 사용 가능합니다.");
      navigate("/login");
      return;
    }
  
    const selectedProductsList = getSelectedProductsList();
    const payload = {
      userEmail: user.email,
      totalPrice: calculateTotalPrice(),
      productDetails: selectedProductsList.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
    };
  
    try {
      // Step 1: CUSTOM_ORDERS 테이블에 주문 데이터 생성
      const orderResponse = await axios.post("/custom/addingCart", {
        userId: payload.userId,
        totalPrice: payload.totalPrice,
      });
  
      const customId = orderResponse.data.customId;
  
      // Step 2: CUSTOM_ORDER_DETAILS 테이블에 상세 정보 추가
      await Promise.all(
        payload.productDetails.map(detail =>
          axios.post("/api/customorder/details", {
            customId,
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price,
          })
        )
      );
  
      // Step 3: customId를 구매 페이지로 전송
      navigate("/purchase", { state: { customId } });
    } catch (error) {
      console.error("Error processing purchase:", error);
      alert("구매 요청에 실패했습니다.");
    }
  };
  

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setOrderQuantity(value); // 주문 갯수 업데이트
    }
  };

  return (
    <div className="own-pc-container">
      <h1>조립 PC 견적 맞추기</h1>
      <div className="pc-selection">
        <ProductListComponent01 onProductSelection={handleProductSelection} />
        <div className="selected-products">
          <h2>선택한 부품</h2>
          {Object.keys(categoryMap).map((categoryId) => (
            <div key={categoryId} className="selected-product-item">
              <p className="product-name3">
                {selectedProducts[categoryId]
                  ? selectedProducts[categoryId].productName
                  : `${categoryMap[categoryId]} 선택 대기 중`}
              </p>
              {selectedProducts[categoryId] && (
                <p className="product-details">
                  수량: {selectedProducts[categoryId].quantity}개 - 가격:{" "}
                  {selectedProducts[categoryId].price}원
                </p>
              )}
            </div>
          ))}
          {isTabCompleted && (
            <div className="action-summary">
              <div className="quantity-control">
                <label htmlFor="orderQuantity">주문 갯수:</label>
                <input
                  id="orderQuantity"
                  type="number"
                  value={orderQuantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
              </div>
              <p className="total-price">
                총합 가격: <strong>{calculateTotalPrice()}원</strong>
              </p>
              <div className="action-buttons">
                <button onClick={handleCartButtonClick}>장바구니</button>
                <button onClick={handlePurchaseButtonClick}>구매하기</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnPc;
