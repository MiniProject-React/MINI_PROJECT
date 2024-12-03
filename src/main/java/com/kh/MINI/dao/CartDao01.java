package com.kh.MINI.dao;

import com.kh.MINI.vo.CartVo01;
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
@Slf4j
@RequiredArgsConstructor

public class CartDao01 {
    private final JdbcTemplate jdbcTemplate;
    private final String SELECT_CART_ITEMS_BY_USER_ID = "SELECT * FROM CART_ITEMS WHERE USER_ID = ?";
    private final String INSERT_CART_ITEMS = "INSERT INTO CART_ITEMS (user_id, product_id, quantity) VALUES (?,?,?)";

    // 유저 아이디값 입력하여 카트 리스트 출력
    public List<CartVo01> cartList(String id) {
        try {
            return jdbcTemplate.query(SELECT_CART_ITEMS_BY_USER_ID,new Object[]{id}, new cartRowMapper());
        } catch (DataAccessException e) {
            log.error("유저 ID.No로 장바구니 조회 실패");
            throw e;
        }
    }
    // 유저아이디, 상품아이디, 수량 입력받아 데이터베이스에 삽입
    public boolean insertCartItem(int userId, int productId, int quantity) {
        try {
            int count = jdbcTemplate.update(INSERT_CART_ITEMS, userId, productId, quantity);
            return count > 0; // 성공 여부 반환
        } catch (DataAccessException e) {
            log.error("장바구니에 아이템 입력 실패: userId={}, productId={}, quantity={}", userId, productId, quantity, e);
            throw new RuntimeException("장바구니에 아이템 추가 중 문제가 발생했습니다.", e); // 커스텀 메시지 포함
        }
    }



    private static class cartRowMapper implements RowMapper<CartVo01> {
        @Override
        public CartVo01 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new CartVo01(
                    rs.getInt("cart_item_id"),
                    rs.getInt("product_id"),
                    rs.getInt("quantity"),
                    rs.getInt("custom_id"),
                    rs.getInt("user_id")
                    );
        }
    }
}
