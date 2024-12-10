import React, { useState } from "react";

const DragAndDropThreeLists = () => {
  const [products] = useState([
    // Make products static (no setter)
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData("item", JSON.stringify({ item, source }));
  };

  const handleDrop = (e, destination) => {
    e.preventDefault();
    const { item, source } = JSON.parse(e.dataTransfer.getData("item"));

    if (source === destination) return; // 같은 곳으로 드래그하면 무시

    // Cart와 Wishlist 간의 이동 처리 (이동)
    if (source === "cart") {
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
    } else if (source === "wishlist") {
      setWishlist((prev) => prev.filter((wishItem) => wishItem.id !== item.id));
    }

    // 드롭된 리스트에 아이템 추가 (복사)
    if (destination === "cart") {
      setCart((prev) => [...prev, item]); // 카트에 아이템 추가
    } else if (destination === "wishlist") {
      setWishlist((prev) => [...prev, item]); // 위시리스트에 아이템 추가
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 드롭 가능한 영역으로 설정
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* 상품 목록 */}
      <div
        onDrop={(e) => handleDrop(e, "products")}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          minHeight: "200px",
          width: "200px",
        }}
      >
        <h2>Products</h2>
        {products.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item, "products")}
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

      {/* 장바구니 */}
      <div
        onDrop={(e) => handleDrop(e, "cart")}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          minHeight: "200px",
          width: "200px",
        }}
      >
        <h2>Cart</h2>
        {cart.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item, "cart")}
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

      {/* 위시리스트 */}
      <div
        onDrop={(e) => handleDrop(e, "wishlist")}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          minHeight: "200px",
          width: "200px",
        }}
      >
        <h2>Wishlist</h2>
        {wishlist.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item, "wishlist")}
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
  );
};

export default DragAndDropThreeLists;
