package com.kh.MINI.ownPcCartAndBuy1;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
//장바구니 아이템 테이블에 데이터 삽입
public class CartItemRepository {

    private final JdbcTemplate jdbcTemplate;

    public CartItemRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 장바구니 아이템 생성
    public int createCartItem(int userId, int productId, int quantity, int customId) {
        String sql = "INSERT INTO CART_ITEMS (user_id, product_id, quantity, custom_id) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, userId, productId, quantity, customId);
    }
}
