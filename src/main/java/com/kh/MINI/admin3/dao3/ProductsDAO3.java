package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.CategoriesVO3;
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
    // 전체 상품
    private static final String ALL_PRODUCTS = "SELECT p.product_id, p.name as product, p.description, " +
            "p.price, p.stock, p.category_id, c.name as category FROM PRODUCTS p JOIN " +
            "CATEGORIES c ON p.category_id = c.category_id";
    // 상품 상세 페이지
    private static final String DETAIL_PRODUCT =  "SELECT p.product_id, p.name as product, p.description, p.price, p.stock, p.category_id, c.name as category FROM PRODUCTS p JOIN CATEGORIES c ON p.category_id = c.category_id WHERE product_id = ?";
    // 상품 수정
    private static final String UPDATE_PRODUCT = "UPDATE PRODUCTS SET name = ? , price = ? , stock =? , description = ? WHERE product_id = ?";
    // 상품 저장
    private static final String SAVE_PRODUCT="INSERT INTO PRODUCTS (name, description, price, stock, category_id) VALUES(?,?,?,?,?)";
    // 상품 삭제
    private static final String DELETE_PRODUCT="DELETE FROM PRODUCTS WHERE PRODUCT_ID =?";
    // 카테고리 리스트
    private static final String ALL_CATEGORY="SELECT * FROM CATEGORIES";
    // 상품 이름 유효성 검사
    private static final String CHECK_PRODUCT_NAME="SELECT COUNT(*) FROM PRODUCTS WHERE NAME = ?";
    // 카테고리 이름 조회
    private static final String GET_CATEGORY_NAME ="SELECT * FROM CATEGORIES WHERE CATEGORY_ID =?";

    // 상품 리스트 출력
    public List<ProductsVO3> getAllProducts() {
        try {
            return jdbcTemplate.query(ALL_PRODUCTS, new ProductsRowMapper());
        } catch (DataAccessException e) {
            log.error("상품 출력 중 예외 발생",e);
            throw e;
        }
    }

    // 상품 상세 모달 창
    public List<ProductsVO3> detailList(int productId) {
        try{
            return jdbcTemplate.query(DETAIL_PRODUCT,new ProductsRowMapper(),productId);
        } catch (DataAccessException e){
            throw e;
        }
    }

    // 상품 수정
    public boolean update(ProductsVO3 vo) {
        try{
            int result = jdbcTemplate.update(UPDATE_PRODUCT, vo.getProduct(),vo.getPrice(),vo.getStock(),vo.getDescription(),vo.getProduct_id());
            return result > 0;
        }catch (DataAccessException e){
            return false;
        }
    }

    // 상품 등록
    public boolean save (ProductsVO3 vo) {
        try{
            int result = jdbcTemplate.update(SAVE_PRODUCT, vo.getProduct(),vo.getDescription(),vo.getPrice(),vo.getStock(),vo.getCategory_id());
            return result > 0;
        }catch (DataAccessException e) {
            log.error("상품 등록 에러",e);
            return false;
        }
    }

    // 상품 삭제
    public boolean delete(ProductsVO3 vo) {
        try {
            int result = jdbcTemplate.update(DELETE_PRODUCT,vo.getProduct_id());
            return result > 0;
        }catch (DataAccessException e) {
            return false;
        }
    }

    // 카테고리 리스트 출력
    public List<CategoriesVO3> category() {
        try{
            return jdbcTemplate.query(ALL_CATEGORY, new CategoryRowMapper());
        }catch (DataAccessException e) {
            log.error("카테고리 리스트 출력시 에러",e);
            throw e;
        }
    }

    // 상품 이름 유효성 검사
    public boolean productName(String name) {
        try{
            int result = jdbcTemplate.queryForObject(CHECK_PRODUCT_NAME, new Object[]{name},Integer.class);
            return result >0;
        }catch (DataAccessException e){
            log.error("상품 이름 유효성 검사 실패 : ", e);
            throw e;
        }
    }
    // 카테고리 이름 조회
    public List<CategoriesVO3> getCategoryName(int categoryId) {
        try{
            return jdbcTemplate.query(GET_CATEGORY_NAME,new CategoryRowMapper(), categoryId);
        }catch (DataAccessException e) {
            log.error("카테고리 이름 조회 중 에러 : ",e);
            throw e;
        }
    }

    // 상품 삭제
    public boolean deleteProduct(int product_id) {
        log.info("상품 삭제시 프로덕트 아이디 확인 : {} ", product_id);
        try {
            int result = jdbcTemplate.update(DELETE_PRODUCT, product_id); // update 사용
            return result > 0;
        } catch (DataAccessException e) {
            log.error("상품 삭제 중 에러 발생", e);
            throw e;
        }
    }




    private static class ProductsRowMapper implements RowMapper<ProductsVO3> {
        @Override
        public ProductsVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ProductsVO3(
                    rs.getInt("product_id"),         // product_id (정수형)
                    rs.getString("product"),         // name (쿼리에서 별칭을 'product'로 지정)
                    rs.getString("description"),     // description (정상적인 컬럼)
                    rs.getInt("price"),              // price (정수형)
                    rs.getInt("stock"),              // stock (정수형)
                    rs.getInt("category_id"),        // category_id (정수형)
                    rs.getString("category")         // category (카테고리 이름)
            );
        }
    }

    private static class CategoryRowMapper implements RowMapper<CategoriesVO3> {
        @Override
        public CategoriesVO3 mapRow(ResultSet rs, int rowNum) throws  SQLException {
            return new CategoriesVO3(
                    rs.getInt("category_id"),
                    rs.getString("name"),
                    rs.getString("description")
            );
        }
    }

}