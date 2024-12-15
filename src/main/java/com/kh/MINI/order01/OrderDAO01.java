package com.kh.MINI.order01;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDAO01 {
            private final JdbcTemplate jdbcTemplate;

    public OrderDAO01(JdbcTemplate jdbcTemplate) {
                this.jdbcTemplate = jdbcTemplate;
            }

            // 주문 테이블에 데이터 삽입
            public int insertOrder(OrderDTO order) {
                String sql = "INSERT INTO ORDERS (name, phone, email, postal_code, address, card_number, status, user_id) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                return jdbcTemplate.update(sql, order.getName(), order.getPhone(), order.getEmail(),
                        order.getPostalCode(), order.getAddress(), order.getCardNumber(),
                        order.getStatus(), order.getUserId());
    }
}