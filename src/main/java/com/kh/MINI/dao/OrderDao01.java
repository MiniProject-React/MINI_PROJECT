package com.kh.MINI.dao;

import com.kh.MINI.vo.OrderDetailsVo01;
import com.kh.MINI.vo.OrderVo01;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class OrderDao01 {
    private final JdbcTemplate jdbcTemplate;
    private final String SELECT_ORDER_BY_EMAIL = "SELECT o.order_id, o.shipping_address, o.order_date, o.status, u.user_id, u.email, u.username FROM ORDERS o JOIN USERS u ON o.user_id = u.user_id WHERE u.email = ?";   // USERS 테이블과 JOIN을 걸어서 가져오기
    private final String GET_ORDER_BY_USERID ="";
    private final String SELECT_ORDER_DETAILS_BY_ORDER_ID = "SELECT * FROM ORDER_DETAILS WHERE order_id = ?";

    //이메일로 주문내역 조회
    public List<OrderVo01> orderList(String email) {
        try {
            return jdbcTemplate.query(SELECT_ORDER_BY_EMAIL, new Object[]{email}, new OrderWithUserInfoRowMapper());
        } catch (DataAccessException e) {
            log.error("이메일로 주문내역 조회 에러 발생");
            throw e;
        }
    }

    //Order_id로 주문내역 상세 테이블 조회
    public List<OrderDetailsVo01> orderDetailsList(int orderId) {
        try {
            return jdbcTemplate.query(SELECT_ORDER_DETAILS_BY_ORDER_ID, new Object[]{orderId}, new OrderDetailsRowMapper());
        }   catch (DataAccessException e) {
            log.error("오더 ID로 상세내역 조회 에러 발생");
            throw e;
        }
    }

    private static class OrderWithUserInfoRowMapper implements RowMapper<OrderVo01> {
        @Override
        public OrderVo01 mapRow(ResultSet rs, int nowNum) throws SQLException {
            return new OrderVo01(
                    rs.getInt("order_id"),
                    rs.getString("shipping_address"),
                    rs.getDate("order_date"),
                    rs.getString("status"),
                    rs.getInt("user_id"),
                    rs.getString("email"),
                    rs.getString("username")
            );
        }
    }
    private static class OrderDetailsRowMapper implements RowMapper<OrderDetailsVo01> {
        @Override
        public OrderDetailsVo01 mapRow(ResultSet rs, int nowNum) throws SQLException {
            return new OrderDetailsVo01(
                    rs.getInt("detail_id"),
                    rs.getInt("quantity"),
                    rs.getInt("price"),
                    rs.getObject("product_id") != null ? rs.getInt("product_id") : null,
                    rs.getObject("custom_id") != null ? rs.getInt("custom_id") : null,
                    rs.getInt("order_id")

            );
        }
    }
}
