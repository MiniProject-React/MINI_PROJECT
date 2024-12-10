package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.OrderDAO3;
import com.kh.MINI.admin3.vo3.CustomPCVO3;
import com.kh.MINI.admin3.vo3.OrdersVO3;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController3 {
    private final OrderDAO3 orderDAO3;

    // 개별 상품 주문 목록 조회
    @GetMapping("/orderList/{user_id}")
    public Map<String, Object> orderList (@PathVariable int user_id) {
        Map<String, Object> resultMap = new HashMap<>();
        List<OrdersVO3> orderList = orderDAO3.orderList(user_id);
        resultMap.put("orderList", orderList);
        return resultMap;
    }

    // 커스텀 상품 주문 목록 조회
    @GetMapping("/customOrderList/{user_id}")
    public Map<String, Object> customOrderList(@PathVariable int user_id) {

        Map<String, Object> resultMap = new HashMap<>();
        List<CustomPCVO3> customOrderList = orderDAO3.customOrderList(user_id);
        resultMap.put("customOrderList", customOrderList);
        System.out.println(customOrderList);
        return resultMap;
    }

}
