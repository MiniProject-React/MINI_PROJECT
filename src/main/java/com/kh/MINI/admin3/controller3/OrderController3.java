package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.OrderDAO3;
import com.kh.MINI.admin3.vo3.CustomPCVO3;
import com.kh.MINI.admin3.vo3.CustomVO3;
import com.kh.MINI.admin3.vo3.OVO3;
import com.kh.MINI.admin3.vo3.OrdersVO3;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.10.20:3000"})
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController3 {
    private final OrderDAO3 orderDAO3;

    // 개별 상품 상세 주문 목록 조회
    @GetMapping("/orderList/{user_id}")
    public Map<String, Object> orderList (@PathVariable("user_id") int user_id) {
        Map<String, Object> resultMap = new HashMap<>();
        List<OrdersVO3> orderList = orderDAO3.orderList(user_id);
        resultMap.put("orderList", orderList);
        return resultMap;
    }

    // 커스텀 상품 상세 주문 목록 조회
    @GetMapping("/customOrderList/{user_id}")
    public Map<String, Object> customOrderList(@PathVariable("user_id") int user_id) {

        Map<String, Object> resultMap = new HashMap<>();
        List<CustomPCVO3> customOrderList = orderDAO3.customOrderList(user_id);
        resultMap.put("customOrderList", customOrderList);
        System.out.println(customOrderList);
        return resultMap;
    }

    // 주문 목록
    @GetMapping("/list/{user_id}")
    public Map<String, Object> order (@PathVariable("user_id") int user_id) {
        Map<String, Object> resultMap = new HashMap<>();
        List<OVO3> order = orderDAO3.order(user_id);
        resultMap.put("order",order);
        return resultMap;
    }

    // 커스텀 목록
    @GetMapping("/custom/{user_id}")
    public Map<String, Object> custom (@PathVariable("user_id") int user_id) {
        Map<String, Object> resultMap = new HashMap<>();
        List<CustomVO3> custom = orderDAO3.custom(user_id);
        resultMap.put("custom", custom);
        return resultMap;
    }

    @PostMapping("/order")
    public Map<String, Object> orderorder (@RequestBody OrdersVO3 vo) throws SQLException {
        Map<String, Object> resultMap = new HashMap<>();
        int total = vo.getTotal_price();
        int user_id = vo.getUser_id();
        log.info("총합 : {} , user_id : {}", total, user_id);

        boolean isSuccess = orderDAO3.orderorder(total, user_id);
        Integer findOrderId = null;

        if (isSuccess) {
            findOrderId = orderDAO3.orderId(user_id);


        }
        System.out.printf("order_id : %d ", findOrderId);
        resultMap.put("findOrderId", findOrderId);


    return resultMap;
    }
    // 오더 상세 추가
    @PostMapping("/orderdetail")
    public ResponseEntity<Boolean> orderdetail(@RequestBody List<OrdersVO3> vo) {
        log.info("주문 상세에서 list로 주문 목록 확인하기 : {}",vo);
        boolean isSuccess =  orderDAO3.orderdetail(vo);
        return ResponseEntity.ok(isSuccess);
    }




}
