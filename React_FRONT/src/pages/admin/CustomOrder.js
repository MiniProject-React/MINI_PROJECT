import React, { useState } from "react";
import axios from "axios";

const CostomOrder = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customCart, setCustomCart] = useState([]);
  const KH_DOMAIN = "http://localhost:8112";

  const productList = () => {
    axios.get(KH_DOMAIN + "/products/list");
  };
  const HandleDragStart = (e, item, source) => {
    e.dataTransfer.setData("item", JSON.stringify({ item, source }));
  };

  const HandleDrop = (e, destination) => {
    e.preventDefault();
    const { item, source } = JSON.parse(e.dataTransfer.getData("item"));

    if (source === destination) return; // 같은 곳으로 드래그하면 무시
    // Cart와 Wishlist 간의 이동 처리 (이동)
    if (source === "cart") {
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
    } else if (source === "customCart") {
      setCustomCart((prev) =>
        prev.filter((wishitem) => wishitem.id !== item.id)
      );
    }

    // 드롭된 리스트에 아이템 추가 (복사)
    if (destination === "cart") {
      setCart((prev) => [...prev, item]);
    } else if (destination === "customCart") {
      setCustomCart((prev) => [...prev, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <p>관리자 홈</p>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* 상품목록*/}
        <div
          onDrop={(e) => HandleDrop(e, "products")}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            minHeight: "200px",
            width: "200px",
          }}
        >
          <h2>Products</h2>
          {products.map((item) => {
            <div
              key={item.id}
              draggable
              onDragStart={(e) => HandleDragStart(e, item, "products")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.name}
            </div>;
          })}
        </div>
        {/*장바구니*/}
        <div
          onDrop={(e) => HandleDrop(e, "cart")}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            minHeight: "200px",
            width: "200px",
          }}
        >
          <h2>Cart</h2>
          {cart.map((item) => {
            <div
              key={item.id}
              draggable
              onDragStart={(e) => HandleDragStart(e, item, "cart")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.name}
            </div>;
          })}
        </div>
        {/* 위시리스트 */}
        <div
          onDrop={(e) => HandleDrop(e, "wishlist")}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            minHeight: "200px",
            width: "200px",
          }}
        >
          <h2>Wishlist</h2>
          {customCart.map((item) => (
            <div
              key={item.id}
              draggalble
              onDragStart={(e) => HandleDragStart(e, item, "customCart")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CostomOrder;
