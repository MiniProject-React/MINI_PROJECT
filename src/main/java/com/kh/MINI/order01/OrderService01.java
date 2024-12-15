package com.kh.MINI.order01;


import org.springframework.stereotype.Service;

@Service
public class OrderService01 {
    private final OrderDAO01 orderDAO01;
    private final OrderDetailsDAO orderDetailsDAO;

    public OrderService01(OrderDAO01 orderDAO01, OrderDetailsDAO orderDetailsDAO) {
        this.orderDAO01 = orderDAO01;
        this.orderDetailsDAO = orderDetailsDAO;
    }

    public void createOrder(OrderDTO order) {
        // 1. 주문 생성
        int orderId = orderDAO01.insertOrder(order);

        // 2. 주문 상세 생성
        for (OrderDetailsDTO item : order.getItems()) {
            orderDetailsDAO.insertOrderDetails(item, orderId);
        }
    }
}