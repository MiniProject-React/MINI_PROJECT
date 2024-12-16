package com.kh.MINI.ownPcCartAndBuy1;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.10.20:3000", "http://192.168.10.25:3000"})
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/custom/")
public class OwnPcController {
    @Autowired
    private final CustomOrderDao customOrderDao;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> customOrder(@RequestBody CustomOrderRequest request) {
        try {
            // 1단계: 커스텀오더 테이블에 새 주문 생성
            Long customId = customOrderDao.createCustom(request.getUserEmail(), request.getTotalPrice());

            // 2단계 : 생성된 customId 반환
            request.getProductDetails().forEach(detail -> {
                customOrderDao.addCustomOrderDetails(customId, detail.getProductId(), detail.getQuantity(), detail.getPrice());
            });

            // 응답 데이터 생성
            Map<String, Object> response = new HashMap<>();
            response.put("customId", customId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error processing order: ", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "주문 처리 중 오류가 발생했습니다.");
            errorResponse.put("errorDetails", e.getMessage());  // 에러 상세 추가
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/addingCart")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody Map<String, Object> payload) {
        String userEmail = payload.get("userEmail").toString();
        Long customId = Long.valueOf(payload.get("customId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());

        // CART_ITEMS 테이블에 데이터 삽입
        customOrderDao.addCartItem(userEmail, customId, quantity);

        // 응답 데이터 생성
        Map<String, Object> response = new HashMap<>();
        response.put("message", "장바구니에 추가되었습니다.");
        return ResponseEntity.ok(response);
    }
}
