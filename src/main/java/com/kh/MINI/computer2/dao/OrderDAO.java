package com.kh.MINI.computer2.dao;

import com.kh.MINI.computer2.vo.OrderVO;
import com.kh.MINI.computer2.vo.ItemVO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDAO {

    // 데이터베이스 대신 임시 데이터로 대체 (예시)
    private List<OrderVO> orders = new ArrayList<>();

    public OrderVO saveOrder(OrderVO order) {
        // 실제로는 데이터베이스에 저장하는 코드가 들어가야 함
        orders.add(order);
        return order; // 임시 저장
    }

    public List<OrderVO> getAllOrders() {
        return orders; // 임시로 저장된 주문 목록 반환
    }
}
