import styled from "styled-components";

// 전체 컨테이너 - 상단 탭, 좌측 부품 리스트, 우측 선택된 부품 표시
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

// 카테고리 탭
export const CategoryTabs = styled.div`
  display: flex;
  justify-content: space-evenly;  // 탭 사이의 간격을 고르게 배치
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 20px;

  div {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    border-radius: 5px;

    &:hover {
      background-color: #ddd;
    }

    &.active {
      background-color: #3f6ad8;  // 선택된 카테고리의 색상
      color: white;  // 흰 글씨
    }
  }
`;

// 카테고리 선택된 부품 및 수량 리스트
export const ProductSort = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

// 좌측 부품 리스트 (선택할 부품들)
export const ProductList = styled.div`
  max-width: 90%;
  min-width: 500px;
  padding: 10px;
  overflow-y: auto;
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  margin: auto;
`;

// 각 부품 카드
export const ProductCard = styled.div`
  display: flex;
  flex-direction: row; /* 수평으로 배치 */
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

// 부품 이미지
export const ProductImage = styled.img`
  width: 120px; /* 이미지 크기 조정 */
  height: 120px; /* 이미지 크기 조정 */
  object-fit: cover;
  margin-right: 20px; /* 이미지와 텍스트 간격 */
`;

// 부품 상세 정보 (이름, 가격, 수량 등)
export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding-right: 10px;
`;

// 부품 이름, 가격, 수량 등의 텍스트 스타일
export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  h3 {
    font-size: 1.1em;
    font-weight: bold;
  }

  p {
    margin: 0;
    color: #555;
    font-size: 0.9em;
  }
`;

// 수량 조정 버튼
export const QuantityControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  button {
    width: 30px;
    height: 30px;
    font-size: 1.2em;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
    }

    &:active {
      background-color: #d0d0d0;
    }
  }

  span {
    font-size: 1.2em;
    margin: 0 10px;
  }
`;

// 선택된 부품 리스트 및 가격 표시
export const SelectedProducts = styled.div`
  flex: 1;
  max-width: 50%;
  padding: 10px;
  overflow-y: auto;
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

// 선택된 부품 리스트 내 항목
export const SelectedProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;

  .product-name {
    font-size: 1em;
  }

  .product-price {
    font-size: 1em;
    color: #555;
  }
`;

// 카테고리 완료 후 나타날 버튼들 (장바구니/구매)
export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    background-color:rgb(80, 80, 80);  // 진한 파란색 배경
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color:rgb(48, 48, 48);  // 호버 시 더 어두운 파란색
    }

    &:active {
      background-color:rgb(12, 12, 12);  // 액티브 상태에서 더 진한 색
      transform: scale(0.98);  // 버튼 클릭 시 살짝 작아짐
    }
  }
`;
