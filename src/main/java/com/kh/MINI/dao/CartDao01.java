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

    private final String SELECT_CART_ITEMS_BY_USER_ID = "SELECT ci.cart_item_id, ci.user_id, ci.product_id, ci.quantity, " +
            "p.name, p.description, p.price, p.stock, p.image_url, " +
            "co.custom_id, co.total_price " +
            "FROM CART_ITEMS ci " +
            "JOIN PRODUCTS p ON ci.product_id = p.product_id " +
            "LEFT JOIN CUSTOM_ORDERS co ON ci.custom_id = co.custom_id " + // 커스텀 주문 정보 LEFT JOIN
            "WHERE ci.user_id = ?";
    private final String INSERT_CART_ITEMS = "INSERT INTO CART_ITEMS (user_id, product_id, quantity) VALUES (?,?,?)";
    private final String DELETE_CART_ITEM = "DELETE FROM CART_ITEMS WHERE CART_ITEM_ID = ?";
    private final String SELECT_ITEM_QUANTITY = "SELECT quantity FROM CART_ITEMS WHERE user_id = ? AND product_id = ?";
    private final String UPDATE_ITEM_QUANTITY = "UPDATE CART_ITEMS SET quantity = ? WHERE user_id = ? AND product_id = ?";
    private final String UPDATE_ITEM_QUANTITY_BY_CART_ID = "UPDATE CART_ITEMS SET quantity = ? WHERE cart_item_id = ?";
    // 유저 아이디값 입력하여 카트 리스트 출력
    public List<CartVo01> cartList(String id) {
        log.error(id);
        try {
            return jdbcTemplate.query(SELECT_CART_ITEMS_BY_USER_ID,new Object[]{id}, new CartRowMapper());
        } catch (DataAccessException e) {
            log.error("유저 ID.No로 장바구니 조회 실패");
            throw e;
        }
    }
    // 유저아이디, 상품아이디, 수량 입력받아 데이터베이스에 삽입 또는 수정
    public boolean insertOrUpdateCartItem(int userId, int productId, int quantity) {
        try {
            // 장바구니에 이미 해당 상품이 있는지 확인
            List<Integer> result = jdbcTemplate.query(
                    SELECT_ITEM_QUANTITY,
                    new Object[]{userId, productId},
                    (rs, rowNum) -> rs.getInt("quantity")
            );

            if (!result.isEmpty()) {
                // 이미 같은 상품이 존재: 수량 업데이트 (단, 0 이하가 되지 않도록)
                int currentQuantity = result.get(0);
                int updatedQuantity = currentQuantity + quantity;

                if (updatedQuantity > 0) { // 수량이 0 이상이어야 함
                    jdbcTemplate.update(UPDATE_ITEM_QUANTITY, updatedQuantity, userId, productId);
                } else {
                    // 0 이하가 되지 않도록 수량을 유지
                    jdbcTemplate.update(UPDATE_ITEM_QUANTITY, 0, userId, productId); // 수량을 0으로 설정
                }
            } else {
                // 같은 상품이 없을 경우: 새로 추가
                jdbcTemplate.update(INSERT_CART_ITEMS, userId, productId, quantity);
            }
            return true;
        } catch (DataAccessException e) {
            log.error("장바구니에 아이템 추가 또는 수량 업데이트 실패: userId={}, productId={}, quantity={}", userId, productId, quantity, e);
            throw new RuntimeException("장바구니에 아이템 추가 또는 업데이트 중 문제가 발생했습니다.", e);
        }
    }
    // 카트아이템아이디를 받아 수량 수정
    public boolean updateCartItemQuantity(int cartItemId, int quantity) {
        try {
            // 수량 업데이트 (수량에 대한 유효성 검사는 프론트엔드에서 처리하므로 여기선 처리하지 않음)
            jdbcTemplate.update(UPDATE_ITEM_QUANTITY_BY_CART_ID, quantity, cartItemId);
            return true;
        } catch (DataAccessException e) {
            log.error("카트 아이템 수량 수정 실패: cartItemId={}, quantity={}", cartItemId, quantity, e);
            throw new RuntimeException("카트 아이템 수량 수정 중 문제가 발생했습니다.", e);
        }
    }


    // 카트 아이템 id 입력 받아서 해당 데이터 삭제
    public boolean deleteCartItem(int cartItemId) {
        try {
            int rowsAffected = jdbcTemplate.update(DELETE_CART_ITEM, cartItemId);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("장바구니 아이템 삭제 실패: cartItemId={}", cartItemId, e);
            throw new RuntimeException("장바구니 아이템 삭제 중 문제가 발생했습니다.", e);
        }
    }



    private static class CartRowMapper implements RowMapper<CartVo01> {
        @Override
        public CartVo01 mapRow(ResultSet rs, int rowNum) throws SQLException {
            // PRODUCTS 테이블 정보
            String productName = rs.getString("name");
            String productDescription = rs.getString("description");
            double productPrice = rs.getDouble("price");
            int productStock = rs.getInt("stock");
            String productImageUrl = rs.getString("image_url");

            // CUSTOM_ORDERS 테이블 정보 (null일 수 있음)
            Integer customId = rs.getObject("custom_id") != null ? rs.getInt("custom_id") : null;
            Double customPrice = rs.getObject("total_price") != null ? rs.getDouble("total_price") : null;

            // PRODUCT 테이블의 정보가 존재하지 않으면 null 처리
            if (productName == null || productDescription == null) {
                productName = productDescription = null;
                productPrice = productStock = 0;
                productImageUrl = null;
            }

            // 반환할 CartVo01 객체 생성
            return new CartVo01(
                    rs.getInt("cart_item_id"),
                    rs.getInt("user_id"),
                    rs.getInt("product_id"),
                    rs.getInt("quantity"),
                    productName,
                    productDescription,
                    productPrice,
                    productStock,
                    productImageUrl,
                    customId,
                    customPrice
            );
        }
    }
}
