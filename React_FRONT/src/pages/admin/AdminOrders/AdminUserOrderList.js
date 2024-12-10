import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosApi3 from "../../../api/AxiosApi3";
import { DiAws } from "react-icons/di";

const AdminUserOrderList = () => {
  const { user_id } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [customOrderList, setCustomOrderList] = useState([]);
  const [order, setOrder] = useState([]);
  const [custom, setCustom] = useState([]);
  useEffect(() => {
    OrderList(user_id);
    CustomOrderList(user_id);
    Order();
    Custom();
  }, [user_id]);

  //  주문 상세 리스트
  const OrderList = async (user_id) => {
    const rsp = await AxiosApi3.orderList(user_id);
    setOrderList(rsp.data.orderList);
    console.log(rsp.data.orderList);
  };

  //  커스텀 주문 상세 리스트
  const CustomOrderList = async (user_id) => {
    const rsp = await AxiosApi3.customOrderList(user_id);
    setCustomOrderList(rsp.data.customOrderList);
    console.log(rsp.data.customOrderList);
  };

  //  주문 리스트
  const Order = async (user_id) => {
    const rsp = await AxiosApi3.order(user_id);
    setOrder(rsp.data.order);
  };

  // 커스텀 리스트
  const Custom = async (user_id) => {
    const rsp = await AxiosApi3.custom(user_id);
    setCustom(rsp.data.custom);
  };
  return (
    <>
      <p>회원 주문 목록</p>
    </>
  );
};
