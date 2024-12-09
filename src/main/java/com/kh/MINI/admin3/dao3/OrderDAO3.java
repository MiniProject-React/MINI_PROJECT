package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.OrdersVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
@Repository
@RequiredArgsConstructor
@Slf4j
public class OrderDAO3 {
    private final JdbcTemplate jdbcTemplate;
    // 낱개 제품에 대한 주문 목록
    private final String ORDER_LIST ="SELECT" +
            "    o.order_id, " +
            "    o.total_price, " +
            "    o.order_date," +
            "    o.status, " +
            "    o.user_id, " +
            "    d.detail_id, " +
            "    d.quantity, " +
            "    d.price, " +
            "    d.subtotal, " +
            "    d.product_id, " +
            "    d.custom_id, " +
            "    c.name as category, " +
            "    p.name as product, " +
            "    p.price, " +
            "    p.description" +
            " FROM " +
            "    ORDERS o " +
            "JOIN " +
            "    ORDER_DETAILS d ON o.order_id = d.order_id " +
            "LEFT JOIN " +
            "    PRODUCTS p ON d.product_id = p.product_id " +
            "LEFT JOIN " +
            "    CATEGORIES c ON p.category_id = c.category_id " +
            "WHERE o.USER_ID = ?";
    // 커스텀 PC에 대한 주문 목록
    private final String CUSTOM_ORDER_LIST ="";

    public List<OrdersVO3> orderList(int userId) {
        try {
            return jdbcTemplate.query(ORDER_LIST, new OrderRowMapper(), userId);
        }catch (DataAccessException e){
            log.error("낱개 상품 주문에 대한 리스트 조회중 오류 발생 : ", e);
            throw e;
        }
    }

    public class OrderRowMapper implements RowMapper<OrdersVO3> {

        @Override
        public OrdersVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            // Order 객체 생성
            OrdersVO3 order = new OrdersVO3();

            // orders 테이블 컬럼 매핑
            order.setOrder_id(rs.getInt("order_id"));
            order.setTotal_price(rs.getInt("total_price"));
            order.setOrder_date(rs.getDate("order_date")); // TIMESTAMP 타입 매핑
            order.setStatus(rs.getString("status"));
            order.setUser_id(rs.getInt("user_id"));

            // order_details 테이블 컬럼 매핑
            order.setDetail_id(rs.getInt("detail_id"));
            order.setQuantity(rs.getInt("quantity"));
            order.setPrice(rs.getInt("price"));
            order.setSubtotal(rs.getInt("subtotal"));
            order.setProduct_id(rs.getInt("product_id"));
            order.setCustom_id(rs.getInt("custom_id"));

            // products 테이블 컬럼 매핑
            order.setDescription(rs.getString("description"));
            order.setProduct_price(rs.getInt("price"));
            order.setProduct(rs.getString("product"));

            // categories 테이블 컬럼 매핑
            order.setCategory(rs.getString("category"));

            return order;
        }
    }

}
