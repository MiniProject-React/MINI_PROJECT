package com.kh.MINI.computer2.service;

import com.kh.MINI.computer2.dao.OrderDAO;
import com.kh.MINI.computer2.dao.ItemDAO;
import com.kh.MINI.computer2.vo.OrderVO;
import com.kh.MINI.computer2.vo.ItemVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderDAO orderDAO;

    @Autowired
    private ItemDAO itemDAO;

    public OrderVO createOrder(OrderVO order) {
        // 아이템들을 먼저 저장
        for (ItemVO item : order.getItems()) {
            itemDAO.saveItem(item);
        }

        // 주문 저장
        return orderDAO.saveOrder(order);
    }

    public List<OrderVO> getAllOrders() {
        return orderDAO.getAllOrders();
    }
}
