package com.kh.MINI.dao;

import com.kh.MINI.vo.ProductVo01;
import com.kh.MINI.vo.ProductWithReviewVo01;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ProductDao01 {
    private final JdbcTemplate jdbcTemplate;
    private static final String SELECT_ALL_PRODUCTS = "SELECT * FROM PRODUCTS ORDER BY category_id";
    private static final String SELECT_PRODUCTS_BY_CATEGORY = "SELECT * FROM PRODUCTS WHERE category_id = ?";
    private static final String SELECT_PRODUCT_BY_ID = "SELECT * FROM PRODUCTS WHERE product_id = ?";
    //카테고리별 정렬을 위한 SQL
    private static final String SELECT_BY_CATEGORY_ORDER_BY_CHOSEN = "SELECT p.product_id, p.name, p.description, p.price, p.stock, p.image_url, p.category_id,\n" +
            "       AVG(r.rating) AS average_rating, COUNT(r.review_id) AS review_count\n" +
            "FROM PRODUCTS p\n" +
            "LEFT JOIN REVIEWS r ON p.product_id = r.product_id\n" +
            "WHERE p.category_id = ?\n" +
            "GROUP BY p.product_id, p.name, p.description, p.price, p.stock, p.image_url, p.category_id\n" +
            "ORDER BY \n" +
            "    CASE \n" +
            "        WHEN ? = 'name' THEN p.name\n" +
            "        WHEN ? = 'price' THEN p.price\n" +
            "        WHEN ? = 'rating' THEN average_rating\n" +
            "        WHEN ? = 'stock' THEN p.stock\n" +
            "        WHEN ? = 'review_count' THEN review_count\n" +
            "        ELSE p.product_id\n" +
            "    END";
    // 전체 부품 리스트
    public List<ProductVo01> productList() {
        try {
            return jdbcTemplate.query(SELECT_ALL_PRODUCTS, new ProductRowMapper());
        } catch (DataAccessException e) {
            log.error("전 부품 목록 조회 중 에러 발생 ", e);
            throw e;
        }
    }
    // 카테고리 숫자를 입력: 카테고리별 부품 리스트
    public List<ProductVo01> productListByCategory(String c) {
        try {
            return jdbcTemplate.query(SELECT_PRODUCTS_BY_CATEGORY, new Object[]{c}, new ProductRowMapper());
        } catch (DataAccessException e) {
            log.error("카테고리 별 부품 조회 중 에러 발생 ", e);
            throw e;
        }
    }
    public List<ProductVo01> productById(String i) {
        try {
            return jdbcTemplate.query(SELECT_PRODUCT_BY_ID, new Object[]{i}, new ProductRowMapper());
        } catch (DataAccessException e) {
            log.error("부품 ID 조회 에러 발생 ", e);
            throw e;
        }

    }
//      일부 출력 조회 실패본
//    public List<ProductWithReviewVo01> getProductsSortedBy(String categoryId, String sortBy, String sortOrder) {
//        String orderByClause = (sortOrder.equals("d") ? "DESC" : "ASC"); // DESC, ASC 설정
//        try {
//            return jdbcTemplate.query(
//                    SELECT_BY_CATEGORY_ORDER_BY_CHOSEN + " " + orderByClause,
//                    new Object[]{categoryId, sortBy,sortBy,sortBy,sortBy,sortBy},
//                    new ProductWithReviewRowMapper()
//            );
//        } catch (DataAccessException e) {
//            log.error("카테고리별 조회 및 정렬 중 에러 발생 ", e);
//            throw e;
//        }
//    }
//



        private NamedParameterJdbcTemplate jdbcTemplate2;
        @Autowired
        public ProductDao01(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate jdbcTemplate2) {
            this.jdbcTemplate = jdbcTemplate;
            this.jdbcTemplate2 = jdbcTemplate2;
        }

        public List<Map<String, Object>> getProductsSorted(String categoryId, String sortColumn, String sortOrder) {
            String orderByClause = (sortOrder.equals("desc") ? "DESC" : "ASC");  // 정렬 순서 (DESC 또는 ASC)

            String sql = "SELECT p.product_id, p.name, p.description, p.price, p.stock, p.image_url, p.category_id, " +
                    "AVG(r.rating) AS average_rating, COUNT(r.review_id) AS review_count " +
                    "FROM PRODUCTS p " +
                    "LEFT JOIN REVIEWS r ON p.product_id = r.product_id " +
                    "WHERE p.category_id = :category_id " +
                    "GROUP BY p.product_id, p.name, p.description, p.price, p.stock, p.image_url, p.category_id " +
                    "ORDER BY " +
                    "CASE " +
                    "WHEN :sort_column = 'name' THEN TO_CHAR(p.name) " +
                    "WHEN :sort_column = 'price' THEN TO_CHAR(p.price) " +
                    "WHEN :sort_column = 'rating' THEN TO_CHAR(average_rating) " +
                    "WHEN :sort_column = 'stock' THEN TO_CHAR(p.stock) " +
                    "WHEN :sort_column = 'review_count' THEN TO_CHAR(review_count) " +
                    "ELSE TO_CHAR(p.product_id) " +
                    "END "
                    ;

            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("category_id", categoryId);
            params.addValue("sort_column", sortColumn);  // 'name', 'price', 'rating' 등


            return jdbcTemplate2.queryForList(sql + " " + orderByClause, params);
        }



    private static class ProductRowMapper implements RowMapper<ProductVo01>{
        @Override
        public ProductVo01 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ProductVo01(
            rs.getInt("product_id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getInt("price"),
            rs.getInt("stock"),
            rs.getString("image_url"),
            rs.getInt("category_id")
            );
        }

    }
    private static class ProductWithReviewRowMapper implements RowMapper<ProductWithReviewVo01> {
        @Override
        public ProductWithReviewVo01 mapRow(ResultSet rs, int nowNum) throws SQLException {
            return new ProductWithReviewVo01(
                    rs.getInt("product_id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getInt("price"),
                    rs.getInt("stock"),
                    rs.getString("image_url"),
                    rs.getInt("category_id"),
                    rs.getDouble("average_rating"),
                    rs.getInt("review_count")
            );
        }
    }
}
