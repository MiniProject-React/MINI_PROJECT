package com.kh.MINI.controller;

import com.kh.MINI.dao.CartDao01;
import com.kh.MINI.vo.CartVo01;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequiredArgsConstructor
public class CartController01 {

    @Autowired
    private final CartDao01 cartDao;

    @GetMapping("/carts/{userId}")
    public ResponseEntity<List<CartVo01>> getCartList (@PathVariable("userId") String userID) {
        try {
            List<CartVo01> cartList = cartDao.cartList(userID);
            return ResponseEntity.ok(cartList);
        } catch (Exception e) {
            log.error("장바구니 조회 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 프론트엔드에서 리퀘스트 파람으로 값을 가져와 성공 실패 확인
    @PostMapping("/carts")
    public ResponseEntity<String> insertItemToCart (
            @RequestParam(value = "userId") int userId,
            @RequestParam(value = "productId") int productId,
            @RequestParam(value = "quantity") int quantity
    ) {

        try {
            boolean isInserted = cartDao.insertOrUpdateCartItem(userId, productId, quantity);
            if (isInserted) {
                return ResponseEntity.ok("장바구니에 아이템이 추가되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("장바구니에 아이템 추가 실패");
            }
        } catch (Exception e) {
            log.error("장바구니 추가 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류로 인해 아이템 추가 실패");
        }
    }
    @PutMapping("/carts/updateQuantity")
    public ResponseEntity<String> updateCartItemQuantity(@RequestBody Map<String, Integer> requestData) {
        try {
            int cartItemId = requestData.get("cart_item_id");
            int quantity = requestData.get("quantity");

            boolean isUpdated = cartDao.updateCartItemQuantity(cartItemId, quantity);
            if (isUpdated) {
                return ResponseEntity.ok("카트 아이템 수량이 업데이트되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("카트 아이템 수량 수정 실패");
            }
        } catch (Exception e) {
            log.error("카트 아이템 수량 수정 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류로 인해 수량 수정 실패");
        }
    }
    @DeleteMapping("/carts/{cartItemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable int cartItemId) {
        try {
            boolean isDeleted = cartDao.deleteCartItem(cartItemId);
            if (isDeleted) {
                return ResponseEntity.ok("장바구니 아이템이 삭제되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("장바구니 아이템 삭제 실패");
            }
        } catch (Exception e) {
            log.error("카트 아이템 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류로 인해 아이템 삭제 실패");
        }
    }
}
