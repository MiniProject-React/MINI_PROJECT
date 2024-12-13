package com.kh.MINI.computer2.controller;

import com.kh.MINI.computer2.service.OrderService;
import com.kh.MINI.computer2.service.ItemService;
import com.kh.MINI.computer2.vo.OrderVO;
import com.kh.MINI.computer2.vo.ItemVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ItemService itemService;

    @PostMapping
    public OrderVO createOrder(@RequestBody OrderVO order) {
        return orderService.createOrder(order);
    }

    @GetMapping
    public List<OrderVO> getAllOrders() {
        return orderService.getAllOrders();
    }
}
