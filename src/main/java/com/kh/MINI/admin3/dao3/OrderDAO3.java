package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.CustomPCVO3;
import com.kh.MINI.admin3.vo3.CustomVO3;
import com.kh.MINI.admin3.vo3.OVO3;
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

    // 주문 조회
    private final String ORDERS ="SELECT * FROM ORDERS WHERE USER_ID = ? ";
    // 커스텀 조회
    private final String CUSTOM ="SELECT * FROM CUSTOM_ORDERS WHERE USER_ID = ?";
    // 관리자 주문 추가
    private static final String INSERT_ORDER_SQL = "INSERT INTO ORDERS (TOTAL_PRICE, ORDER_DATE, STATUS, USER_ID) " +
            "VALUES (?, CURRENT_TIMESTAMP, '결제 대기', ?) " +
            "RETURNING order_id INTO ?";
    // 최근 등록된 ORDER_ID값 조회
    private static final String FIND_NEW_ORDER = "SELECT order_id " +
            "FROM ( " +
            "    SELECT * " +
            "    FROM orders " +
            "    WHERE user_id = ? " +
            "    ORDER BY order_date DESC " +
            ") " +
            "WHERE ROWNUM = 1";


    // 주문 상세 조회
    public List<OrdersVO3> orderList(int userId) {
        try {
            return jdbcTemplate.query(ORDER_LIST, new OrderRowMapper(), userId);
        }catch (DataAccessException e){
            log.error("낱개 상품 주문에 대한 리스트 조회중 오류 발생 : ", e);
            throw e;
        }
    }

    // 커스텀 주문 상세 조회
    public List<CustomPCVO3> customOrderList(int userId) {
        try{
            return jdbcTemplate.query(CUSTOM_ORDER_LIST, new CustomPCRowMapper(), userId);
        }catch (DataAccessException e) {
            log.error("커스텀 제품 조회중 에러 발생 ",e);
            throw e;
        }
    }

    // 주문 조회
    public List<OVO3> order(int userId) {
        try{
            return jdbcTemplate.query(ORDERS, new ORowMapper(), userId);
        }catch (DataAccessException e) {
            log.error("주문 조회", e );
            throw e;
        }
    }

    public List<CustomVO3> custom(int userId) {
        try{
            return jdbcTemplate.query(CUSTOM, new CRowMapper(), userId);
        }catch (DataAccessException e) {
            log.error("커스텀 조회", e);
            throw e;
        }
    }

    public boolean orderorder(int totalPrice, int userId) {
        // 'RETURNING' 절을 처리할 수 있도록 수정한 SQL 쿼리
        String sql = "INSERT INTO ORDERS (TOTAL_PRICE, ORDER_DATE, STATUS, USER_ID) " +
                "VALUES (?, CURRENT_TIMESTAMP, '결제 대기', ?) ";

        try {
            // 쿼리 실행 후 order_id 반환
            int result = jdbcTemplate.update(sql, totalPrice, userId);
            return result > 0;
        } catch (DataAccessException e) {
            log.error("주문 추가 시 에러 발생: ", e);
            return false;
        }

    }

    public Integer orderId(int user_id) {
        try{
            return jdbcTemplate.queryForObject(FIND_NEW_ORDER, new Object[]{user_id},Integer.class);
        }catch (DataAccessException e){
            log.error("최근 주문 아이디 검색 ",e);
            throw e;
        }
    }

    public boolean orderdetail(List<OrdersVO3> orderDetails) {
      boolean isSuccess = true;
      for (OrdersVO3 vo : orderDetails){
          log.info("주문 상세 수량 확인 : {} ", vo.getQuantity());
          log.info("주문 상세 가격 확인 : {}", vo.getPrice());
          log.info("주문 상세 상품 아이디 확인 : {}", vo.getProduct_id());
          log.info("주문 상세 주문 아이디 확인 : {}", vo.getOrder_id());
      }
      for(OrdersVO3 vo : orderDetails) {
          try{
              int result = jdbcTemplate.update("insert into order_details (quantity, price, product_id, order_id) values (?,?,?,?)"
                      ,vo.getQuantity(),vo.getPrice(), vo.getProduct_id(),vo.getOrder_id());
            if(result <= 0) {
                isSuccess = false;
                break;
            }
          }catch (DataAccessException e) {
              log.error("주문 디테일 입력시 에러", e);
              throw e;
          }
      }
      return isSuccess;
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
    public class ORowMapper implements RowMapper<OVO3> {
        @Override
        public OVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            OVO3 ovo3 = new OVO3();
            ovo3.setOrder_id(rs.getInt("order_id"));
            ovo3.setTotal_price(rs.getInt("total_price"));
            ovo3.setOrder_date(rs.getDate("order_date"));
            ovo3.setStatus(rs.getString("status"));
            ovo3.setUser_id(rs.getInt("user_id"));
            return ovo3;
        }
    }
    public class CRowMapper implements RowMapper<CustomVO3> {
        @Override
        public CustomVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            CustomVO3 customVO3 = new CustomVO3();
            customVO3.setCustom_id(rs.getInt("custom_id"));
            customVO3.setTotal_price(rs.getInt("total_price"));
            customVO3.setUser_id(rs.getInt("user_id"));
            return customVO3;
        }
    }
}