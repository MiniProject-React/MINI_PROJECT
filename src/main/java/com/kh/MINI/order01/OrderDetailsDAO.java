package com.kh.MINI.order01;



import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDetailsDAO {
    private final JdbcTemplate jdbcTemplate;

    public OrderDetailsDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 주문 상세 테이블에 데이터 삽입
    public int insertOrderDetails(OrderDetailsDTO details, int orderId) {
        String sql = "INSERT INTO ORDER_DETAILS (quantity, price, product_id, order_id) " +
                "VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, details.getQuantity(), details.getPrice(),
                details.getProductId(), orderId);
    }
}
