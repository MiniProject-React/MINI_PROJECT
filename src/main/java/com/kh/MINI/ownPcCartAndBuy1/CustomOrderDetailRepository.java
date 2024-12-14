package com.kh.MINI.ownPcCartAndBuy1;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
// 커스텀 오더 디테일 테이블에 데이터 삽입
public class CustomOrderDetailRepository {

    private final JdbcTemplate jdbcTemplate;

    public CustomOrderDetailRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 커스텀 오더 디테일 생성
    public int createCustomOrderDetail(int customId, int productId, int quantity, double price) {
        double subtotal = quantity * price; // 소계 계산
        String sql = "INSERT INTO CUSTOM_ORDER_DETAILS (custom_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, customId, productId, quantity, price, subtotal);
    }

}
