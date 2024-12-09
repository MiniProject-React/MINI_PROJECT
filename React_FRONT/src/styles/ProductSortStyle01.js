import styled from "styled-components";

export const ProductSort = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  justify-content: center;
  gap: 20px; /* 카드 간의 간격 */
  margin: 0 auto;
  max-width: 900px; /* 최대 너비 */
  max-height: 700px; /* 최대 높이 */
  overflow-y: auto; /* 세로 스크롤 */

  padding: 10px;
  border: 1px solid #ccc; /* 외곽 경계선 */

  /* 스크롤 커스터마이징 */
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤 바 너비 */
  }
  &::-webkit-scrollbar-track {
    background: none; /* 스크롤 바 뒷 배경 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #999; /* 스크롤 바 색상 */
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #777; /* 호버 시 스크롤 바 색상 */
  }
`;

export const ProductSortList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProductCard = styled.div`
  flex: 0 0 250px; /* 고정 크기: 줄어들거나 커지지 않음 */
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05); /* 확대 효과 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1; /* 정사각형 */
  object-fit: cover;
`;

export const ProductDetails = styled.div`
  padding: 5px 10px 5px 10px; /* 조금 더 좁게 설정 */
  height: 75px;
  padding-bottom: 2px;
  display: flex; /* 좌우로 배치 */
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;

  .left {
    flex: 1; /* 왼쪽 영역 */
    h3 {
      font-size: 1em; /* 이름 크기를 약간 줄이기 */
      margin-bottom: 5px;
      font-weight: bold;
    }
  }

  .right {
    flex: 1; /* 오른쪽 영역 */
    text-align: right;

    p {
      margin: 2px 0;
      font-size: 0.8em;
      color: #555;
    }
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;

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

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between; /* 버튼을 양쪽으로 배치 */

  margin-top: 5px;

  button {
    flex: 1; /* 버튼을 동일한 너비로 설정 */
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    cursor: pointer;
  }

  .cart-btn {
    background-color: #2196f3; /* 장바구니 버튼 색상 */
  }

  .buy-btn {
    background-color: #4caf50; /* 구매 버튼 색상 */
  }

  button:hover {
    opacity: 0.9; /* 호버 효과 */
  }
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  aspect-ratio: 1; /* 정사각형 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #aaa;
  font-size: 0.9em;
  text-align: center;
`;
