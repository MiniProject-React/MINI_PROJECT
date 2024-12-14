package com.kh.MINI.ownPcCartAndBuy1;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
// 커스텀 오더 테이블에 테이터 삽입
public class CustomOrderRepository {

    private final JdbcTemplate jdbcTemplate;

    public CustomOrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 커스텀 오더 생성

    public int createCustomOrder(int userId, double totalPrice) {
        String sql = "INSERT INTO CUSTOM_ORDERS (total_price, user_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql, totalPrice, userId);
    }
}
