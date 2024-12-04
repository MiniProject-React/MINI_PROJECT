package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.ProductsVO3;
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
public class ProductsDAO3 {
    private final JdbcTemplate jdbcTemplate;
    private static final String ALL_PRODUCTS = "SELECT p.product_id, p.name as product, p.description, p.price, p.stock, p.category_id, c.name as category FROM PRODUCTS p JOIN CATEGORIES c ON p.category_id = c.category_id";

    public List<ProductsVO3> getAllProducts() {
        try {
            return jdbcTemplate.query(ALL_PRODUCTS, new ProductsRowMapper() {
            });
        } catch (DataAccessException e) {
            log.error("상품 출력 중 예외 발생",e);
            throw e;
        }
    }
    private static class ProductsRowMapper implements RowMapper<ProductsVO3> {
        @Override
        public ProductsVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ProductsVO3(
                    rs.getInt("product_id"),      // OK
                    rs.getString("product"),      // "name" 대신 "product"
                    rs.getString("description"),  // OK
                    rs.getInt("price"),           // OK
                    rs.getInt("stock"),           // OK
                    null,                         // "image_url"은 쿼리에 없으므로 기본값 사용
                    rs.getInt("category_id"),     // OK
                    rs.getString("product"),      // OK
                    rs.getString("category")      // OK
            );
        }
    }

}
