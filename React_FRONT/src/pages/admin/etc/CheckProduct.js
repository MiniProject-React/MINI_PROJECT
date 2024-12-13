import React, { useState } from "react";

const ProductTable = ({ products }) => {
  // 각 상품에 대한 체크박스 상태를 저장하는 객체
  const [selectedProducts, setSelectedProducts] = useState({});

  // 체크박스 값 변경 처리
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // 현재 체크 상태를 반전시킴
    }));
  };

  // 상품 등록 버튼 클릭 처리
  const handleSubmit = () => {
    const selectedItems = Object.keys(selectedProducts)
      .filter((productId) => selectedProducts[productId]) // 체크된 상품 필터링
      .map((productId) =>
        products.find((product) => product.id === parseInt(productId))
      ); // 상품 정보 가져오기

    // 선택된 상품들로 최종 등록
    console.log("등록된 상품들:", selectedItems);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>상품</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts[product.id] || false}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit}>상품 등록</button>
    </div>
  );
};

export default ProductTable;
