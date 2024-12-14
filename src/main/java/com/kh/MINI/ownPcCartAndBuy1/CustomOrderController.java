package com.kh.MINI.ownPcCartAndBuy1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/custom-order")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomOrderController {

    private final CustomOrderService customOrderService;

    @Autowired
    public CustomOrderController(CustomOrderService customOrderService) {
        this.customOrderService = customOrderService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCustomOrder(@RequestBody CustomOrderRequest request) {
        try {
            customOrderService.createCustomOrder(
                    request.getUserId(),
                    request.getTotalPrice(),
                    request.getProductDetails());
            return ResponseEntity.ok("커스텀 주문이 성공적으로 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류 발생: " + e.getMessage());
        }
    }
}
