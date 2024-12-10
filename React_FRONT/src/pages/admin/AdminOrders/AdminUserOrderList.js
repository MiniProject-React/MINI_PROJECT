import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosApi3 from "../../../api/AxiosApi3";
import OrderModal from "./OrderModal";
import CustomModal from "./CustomModal";
const AdminUserOrderList = () => {
  const { user_id } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [customOrderList, setCustomOrderList] = useState([]);
  const [order, setOrder] = useState([]);
  const [custom, setCustom] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  useEffect(() => {
    OrderList(user_id);
    CustomOrderList(user_id);
    Order(user_id);
    Custom(user_id);
  }, [user_id]);

  const OrderList = async (user_id) => {
    const rsp = await AxiosApi3.orderList(user_id);
    setOrderList(rsp.data.orderList);
    console.log(rsp.data.orderList);
  };

  const CustomOrderList = async (user_id) => {
    const rsp = await AxiosApi3.customOrderList(user_id);
    setCustomOrderList(rsp.data.customOrderList);
    console.log(rsp.data.customOrderList);
  };

  const Order = async (user_id) => {
    const rsp = await AxiosApi3.order(user_id);
    setOrder(rsp.data.order);
  };

  const Custom = async (user_id) => {
    const rsp = await AxiosApi3.custom(user_id);
    setCustom(rsp.data.custom);
  };

  const OrderDetailModal = () => {
    console.log("주문 디테일");
    setModal(true);
  };
  const CustomDetailModal = () => {
    console.log("커스텀 디테일");
    setModal1(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const closeModal1 = () => {
    setModal1(false);
  };
  return (
    <>
      <div className="container my-4">
        <h1 className="mb-4">회원 주문 목록</h1>
        <h3 className="mt-5">개별 상품 주문</h3>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>주문</th>
              <th>총액</th>
              <th>주문일자</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 ? (
              order.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.total_price}</td>
                  <td>{order.order_date}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={OrderDetailModal}
                    >
                      상세 정보
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 className="mt-5">커스텀 PC 주문</h3>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>주문</th>
              <th>총액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {custom.length > 0 ? (
              custom.map((custom) => (
                <tr key={custom.custom_id}>
                  <td>{custom.custom_id}</td>
                  <td>{custom.total_price}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={CustomDetailModal}
                    >
                      상세 정보
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <OrderModal
        open={modal}
        close={closeModal}
        type={true}
        orderList={orderList}
      />
      <CustomModal
        open={modal1}
        close={closeModal1}
        type={true}
        customOrderList={customOrderList}
      />
    </>
  );
};

export default AdminUserOrderList;
