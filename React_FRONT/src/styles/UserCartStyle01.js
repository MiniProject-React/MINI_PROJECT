import styled from "styled-components";

export const CartContainer = styled.div`
  padding: 20px;
  background-color: #f7f9fc;
  height: 600px;
  overflow-y: auto; /* 스크롤 */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
`;

export const CartTitle = styled.h2`
  color: #1e3a8a;
  margin-bottom: 20px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e5e7eb;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;

  flex-shrink: 0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FallbackText = styled.p`
  color: #374151;
  font-size: 14px;
`;

export const CartDetails = styled.div`
  flex: 1;
  margin-left: 15px;

  p {
    margin: 5px 0;
  }
`;

export const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const TotalPrice = styled.h3`
  color: #1e3a8a;
`;

export const CheckoutSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 중앙과 우측 배치 */
  background-color: #f0f4fa; /* 장바구니와 동일한 배경색 */
  padding: 10px 20px; /* 여백 추가 */
  border-top: 1px solid #e5e7eb; /* 구분선 */

  h3 {
    flex: 1;
    text-align: center;
    color: #1e3a8a;
  }
`;

export const CheckoutButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  background-color: #f1f5f9;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 20px;
  color: #64748b;

  h3 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #94a3b8;
  }
`;
