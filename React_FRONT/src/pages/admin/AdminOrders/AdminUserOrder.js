import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosApi3 from "../../../api/AxiosApi3";

const AdminUserOrder = () => {
  const { user_id } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [customOrderList, setCustomOrderList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log(user_id);
    OrderList(user_id);
    CustomOrderList();
    // ProductList();
  }, [user_id]);

  // 개별 상품 주문 리스트
  const OrderList = async (user_id) => {
    const rsp = await AxiosApi3.orderList(user_id);
    setOrderList(rsp.data.orderList);
  };

  // 커스텀 PC 주문 리스트
  const CustomOrderList = async (user_id) => {
    const rsp = await AxiosApi3.customOrderList(user_id);
    setCustomOrderList(rsp.data.customOrderList);
  };

  // 상품 리스트
  const ProductList = async () => {
    const rsp = await AxiosApi3.productList();
    setProductList(rsp.data.productList);
  };

  return (
    <>
      <p>주문 목록 조회</p>
    </>
  );
};

export default AdminUserOrder;
