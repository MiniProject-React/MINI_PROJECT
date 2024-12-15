package com.kh.MINI.order01;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("OrderController01")
@RequestMapping("/api")
public class OrderController01 {
    private final OrderService01 orderService01;

    public OrderController01(OrderService01 orderService01) {
        this.orderService01 = orderService01;
    }

    @PostMapping("/createOrder")
    public ResponseEntity<String> createOrder(@RequestBody OrderDTO order) {
        try {
            orderService01.createOrder(order);
            return ResponseEntity.ok("Order created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Order creation failed.");
        }
    }
}
