import React, { useEffect, useState } from "react";
import AxiosApi01 from "../api/AxiosApi01";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: center;
  background-color: #f4f4f4;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;

// 주문 상세 컴포넌트
const OrderDetailModal = ({ show, onHide, order }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("Fetching order details for order ID:", order.orderId);
        const rsp = await AxiosApi01.getOrderDetails(order.orderId);

        // 각 상품의 이름 가져오기
        const detailsWithProductNames = await Promise.all(
          rsp.data.map(async (item) => {
            try {
              const productRsp = await AxiosApi01.getProductById(
                item.productId
              );
              return { ...item, productName: productRsp.data.name };
            } catch (error) {
              console.error("Error fetching product name:", error);
              return { ...item, productName: "Unknown Product" }; // 에러 발생 시 기본값
            }
          })
        );

        setOrderDetails(detailsWithProductNames);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [show]);
  const formatPrice = (price) => {
    // 숫자를 세자리수마다 , 단위 구분 추가
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 주문id값을 받아 상품 이름 반환

  return (
    <ModalBackground show={show}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>주문 상세</ModalTitle>
          <CloseButton onClick={onHide}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <h5>주문 ID: {order.orderId}</h5>
          <p>주문 날짜: {order.orderDate}</p>
          <p>주문 상태: {order.status}</p>
          <p>배송지: {order.shippingAddress}</p>

          <Table>
            <thead>
              <tr>
                <TableHeader>제품명</TableHeader>
                <TableHeader>수량</TableHeader>
                <TableHeader>가격</TableHeader>
                <TableHeader>총 금액</TableHeader>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => (
                <tr key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatPrice(item.price)}원</TableCell>
                  <TableCell>
                    {formatPrice(item.quantity * item.price)}원
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onHide}>닫기</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default OrderDetailModal;
