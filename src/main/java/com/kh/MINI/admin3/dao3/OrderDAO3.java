package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.CustomPCVO3;
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
            "WHERE o.USER_ID = ? AND D.PRODUCT_ID IS NOT NULL";

    // 커스텀 PC에 대한 주문 목록
    private final String CUSTOM_ORDER_LIST = "SELECT C.CUSTOM_ID, C.TOTAL_PRICE, C.USER_ID, " +
            "D.DETAIL_ID, D.QUANTITY, D.PRICE, D.SUBTOTAL, D.PRODUCT_ID, " +
            "O.ORDER_ID, O.TOTAL_PRICE, O.ORDER_DATE, O.STATUS, " +
            "P.NAME, T.NAME, T.CATEGORY_ID " +
            "FROM CUSTOM_ORDERS C " +
            "JOIN CUSTOM_ORDER_DETAILS D ON C.CUSTOM_ID = D.CUSTOM_ID " +
            "LEFT OUTER JOIN ORDERS O ON C.USER_ID = O.USER_ID " +
            "LEFT OUTER JOIN PRODUCTS P ON D.PRODUCT_ID = P.PRODUCT_ID " +
            "LEFT OUTER JOIN CATEGORIES T ON P.CATEGORY_ID = T.CATEGORY_ID " +
            "WHERE O.USER_ID = ?";

    public List<OrdersVO3> orderList(int userId) {
        try {
            return jdbcTemplate.query(ORDER_LIST, new OrderRowMapper(), userId);
        }catch (DataAccessException e){
            log.error("낱개 상품 주문에 대한 리스트 조회중 오류 발생 : ", e);
            throw e;
        }
    }

    public List<CustomPCVO3> customOrderList(int userId) {
        try{
            return jdbcTemplate.query(CUSTOM_ORDER_LIST, new CustomPCRowMapper(), userId);
        }catch (DataAccessException e) {
            log.error("커스텀 제품 조회중 에러 발생 ",e);
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

    public class CustomPCRowMapper implements RowMapper<CustomPCVO3> {

        @Override
        public CustomPCVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            // CustomPCVO3 객체 생성
            CustomPCVO3 customPC = new CustomPCVO3();

            // custom_orders 테이블 컬럼 매핑
            customPC.setCustom_id(rs.getInt("CUSTOM_ID"));
            customPC.setTotal_price(rs.getInt("TOTAL_PRICE"));
            customPC.setUser_id(rs.getInt("USER_ID"));

            // custom_order_details 테이블 컬럼 매핑
            customPC.setDetail_id(rs.getInt("DETAIL_ID"));
            customPC.setQuantity(rs.getInt("QUANTITY"));
            customPC.setPrice(rs.getInt("PRICE"));
            customPC.setSubtotal(rs.getInt("SUBTOTAL"));
            customPC.setProduct_id(rs.getInt("PRODUCT_ID"));

            // orders 테이블 컬럼 매핑
            customPC.setOrder_id(rs.getInt("ORDER_ID"));
            customPC.setTotal(rs.getInt("TOTAL_PRICE"));
            customPC.setOrder_date(rs.getTimestamp("ORDER_DATE"));
            customPC.setStatus(rs.getString("STATUS"));

            // products 테이블 컬럼 매핑
            customPC.setProduct(rs.getString("NAME"));

            // categories 테이블 컬럼 매핑
            customPC.setCategory(rs.getString("NAME"));
            customPC.setCategory_id(rs.getInt("CATEGORY_ID"));

            return customPC;
        }
    }
}