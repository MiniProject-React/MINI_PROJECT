package com.kh.MINI.controller;

import com.kh.MINI.dao.OrderDao01;
import com.kh.MINI.vo.OrderDetailsVo01;
import com.kh.MINI.vo.OrderVo01;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController01 {
    private final OrderDao01 orderDao01;

    // 이메일로 주문내역 조회
    @GetMapping("/{email}")
    public ResponseEntity<List<OrderVo01>> getOrderList(@PathVariable String email) {
        List<OrderVo01> list = orderDao01.orderList(email);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/details/{orderId}")
    public ResponseEntity<List<OrderDetailsVo01>> getOrderDetailList(@PathVariable int orderId) {
        List<OrderDetailsVo01> list = orderDao01.orderDetailsList(orderId);
        return ResponseEntity.ok(list);
    }
}
