import React, { useEffect, useState } from "react";
import AxiosApi01 from "../../api/AxiosApi01";

import OrderDetailModal from "../../utils/OrderdetailsModal";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  text-align: center;
  padding: 12px;
  background-color: #f4f4f4;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 12px;
  border: 1px solid #ddd;
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

const OrderHistory01 = ({ user }) => {
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 주문 목록 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const rsp = await AxiosApi01.getOrdersList(user.email); // 회원의 주문 목록 조회
        setOrdersList(rsp.data); // 주문 목록 설정
      } catch (error) {
        console.log("주문 목록 조회 실패", error);
      }
    };
    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    // 숫자를 세자리수마다 , 단위 구분 추가
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 주문 클릭시 모달 표시
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <Container>
      <h3>주문 목록</h3>
      <Table>
        <thead>
          <tr>
            <TableHeader>주문 ID</TableHeader>
            <TableHeader>주문 날짜</TableHeader>
            <TableHeader>상태</TableHeader>
            <TableHeader>총 금액</TableHeader>
            <TableHeader>상세 보기</TableHeader>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order, index) => (
            <tr key={index}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.status}</TableCell>
              {/* <TableCell>{formatPrice(order.total_amount)}원</TableCell> */}
              <TableCell>
                <Button onClick={() => handleOrderClick(order)}>
                  상세 보기
                </Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedOrder && (
        <OrderDetailModal
          show={showModal}
          onHide={() => setShowModal(false)}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default OrderHistory01;
