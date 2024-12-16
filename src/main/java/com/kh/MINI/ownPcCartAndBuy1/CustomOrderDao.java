package com.kh.MINI.ownPcCartAndBuy1;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
@Slf4j
@RequiredArgsConstructor
public class CustomOrderDao {

    private final JdbcTemplate jdbcTemplate;

    private final String SELECT_USER_ID_BY_EMAIL = "SELECT user_id FROM USERS WHERE email = ?";
    private final String INSERT_CUSTOM_ORDER =
            "INSERT INTO CUSTOM_ORDERS (custom_id, user_id, total_price) VALUES (ORDER_SEQ.NEXTVAL, ?, ?)";
    private final String SELECT_LAST_INSERTED_CUSTOM_ID =
            "SELECT custom_id FROM (SELECT custom_id FROM CUSTOM_ORDERS WHERE user_id = ? ORDER BY custom_id DESC) WHERE ROWNUM = 1";
    private final String INSERT_CUSTOM_ORDER_DETAILS = "INSERT INTO CUSTOM_ORDER_DETAILS (detail_id, custom_id, product_id, quantity, price, subtotal) VALUES (ORDER_DETAIL_SEQ.NEXTVAL, ?, ?, ?, ?, ?)";
    private final String INSERT_CART_ITEM = "" +
            "INSERT INTO CART_ITEMS (user_id, custom_id, quantity) VALUES (?, ?, ?)";

    private int findUserIdByEmail2(String email) {
        try {
            return jdbcTemplate.queryForObject(SELECT_USER_ID_BY_EMAIL, new Object[]{email}, Integer.class);
        } catch (DataAccessException e) {
            log.error("유저 이메일로 user_id 조회 실패: email={}", email, e);
            return -1; // 사용자 없음 표시 또는 적절한 기본값 설정
        }
    }

    // Step 1: CUSTOM_ORDERS 테이블에 데이터 삽입
    public Long createCustom(String userEmail, Double totalPrice) {
        int userId = findUserIdByEmail2(userEmail);
        log.error("유저 이메일로 조회한 user_id : {}", userId);
        if (userId == -1) {
            throw new IllegalArgumentException("이메일에 해당하는 사용자가 존재하지 않습니다.");
        }

        // CUSTOM_ORDERS에 데이터 삽입
        jdbcTemplate.update(INSERT_CUSTOM_ORDER, userId, totalPrice);

        // 마지막으로 삽입된 custom_id 조회
        Long customId = jdbcTemplate.queryForObject(SELECT_LAST_INSERTED_CUSTOM_ID, new Object[]{userId}, Long.class);
        log.info("배정된 커스텀Id : {}", customId);
        return customId;
    }
    // Step 2: CUSTOM_ORDER_DETAILS 테이블에 데이터 삽입
    public void addCustomOrderDetails(Long customId, Long productId, int quantity, double price) {
        double subtotal = quantity * price;
        jdbcTemplate.update(INSERT_CUSTOM_ORDER_DETAILS, customId, productId, quantity, price, subtotal);
        log.info("customId {}에 대해 productId {} 상세 정보 추가 완료", customId, productId);
    }
    // CART_ITEMS 테이블에 데이터 삽입
    public void addCartItem(String userEmail, Long customId, int quantity) {
        int userId = findUserIdByEmail2(userEmail);
        jdbcTemplate.update(INSERT_CART_ITEM, userId, customId, quantity);
        log.info("userId {}에 대해 customId {} 장바구니 추가 완료 (수량: {})", userId, customId, quantity);
    }
}
