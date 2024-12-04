import React, { useState } from "react";

const DragAndDropThreeLists = () => {
  const [products, setProducts] = useState([
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

    // 현재 리스트에서 아이템 제거
    if (source === "products") {
      setProducts((prev) => prev.filter((product) => product.id !== item.id));
    } else if (source === "cart") {
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
    } else if (source === "wishlist") {
      setWishlist((prev) => prev.filter((wishItem) => wishItem.id !== item.id));
    }

    // 드롭된 리스트에 아이템 추가
    if (destination === "products") {
      setProducts((prev) => [...prev, item]);
    } else if (destination === "cart") {
      setCart((prev) => [...prev, item]);
    } else if (destination === "wishlist") {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 드롭 가능한 영역으로 설정
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* 상품 목록 */}
      <List
        title="Products"
        items={products}
        onDragStart={(e, item) => handleDragStart(e, item, "products")}
        onDrop={(e) => handleDrop(e, "products")}
        onDragOver={handleDragOver}
      />

      {/* 장바구니 */}
      <List
        title="Cart"
        items={cart}
        onDragStart={(e, item) => handleDragStart(e, item, "cart")}
        onDrop={(e) => handleDrop(e, "cart")}
        onDragOver={handleDragOver}
      />

      {/* 위시리스트 */}
      <List
        title="Wishlist"
        items={wishlist}
        onDragStart={(e, item) => handleDragStart(e, item, "wishlist")}
        onDrop={(e) => handleDrop(e, "wishlist")}
        onDragOver={handleDragOver}
      />
    </div>
  );
};

// 공통 List 컴포넌트
const List = ({ title, items, onDragStart, onDrop, onDragOver }) => {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        minHeight: "200px",
        width: "200px",
      }}
    >
      <h2>{title}</h2>
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              cursor: "grab",
            }}
          >
            {item.name}
          </div>
        ))
      ) : (
        <p>Drag items here</p>
      )}
    </div>
  );
};

export default DragAndDropThreeLists;
