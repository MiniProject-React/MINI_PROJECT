import styled from "styled-components";

export const TotalAmountContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #ced4da;
  padding: 10px 20px;
  border-top: 1px solid #868e96;
  text-align: right;
  font-weight: bold;
  font-size: 16px;
  z-index: 1; /* 총 합계가 카트 아이템 위로 가도록 설정 */
`;

export const CartContainer = styled.div`
  position: fixed;
  top: 50px;
  bottom: 50px;
  right: 25px;
  width: 25%;
  background-color: #f4f4f4;
  padding: 20px;
  padding-bottom: 0px;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
  overflow-x: hidden; /*스크롤 밀림 방지 */
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; /* 수직 레이아웃 */
`;

export const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; /* 리스트가 자리를 채우도록 함 */
`;

export const CartItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const CartImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;

  /* 이미지가 없을 경우 대체 텍스트 표시 */
  &:empty {
    background-color: #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 12px;
  }
`;

export const NoImagePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background-color: #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 12px;
  border-radius: 8px;
  margin-right: 10px;
`;

export const CartDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ProductName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Quantity = styled.div`
  margin-bottom: 5px;
`;

export const TotalPrice = styled.div`
  margin-bottom: 10px;
`;
export const QuantityButtons = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 5px;

  button {
    padding: 5px;
    border: none;
    background-color: #868e96;
    color: white;
    border-radius: 5px;
    font-size: 12px;
    height: 20px;
    width: 20px;
    cursor: pointer;

    &:hover {
      background-color: #495057;
    }
  }
`;

export const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #e60000;
  }
`;
