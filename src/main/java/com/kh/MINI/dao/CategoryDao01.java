package com.kh.MINI.dao;

import com.kh.MINI.vo.CategoryVo01;
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
public class CategoryDao01 {
    private final JdbcTemplate jdbcTemplate;

    private String SELECT_ALL_CATEGORY_TBL = "SELECT * FROM CATEGORIES";

    public List<CategoryVo01> categoryList () {
        try {
            return jdbcTemplate.query(SELECT_ALL_CATEGORY_TBL, new CategoryRowMapper());
        } catch (DataAccessException e) {
            log.error("카테고리 테이블 생성 실패");
            throw e;
        }
    }
    private static class CategoryRowMapper implements RowMapper<CategoryVo01>{
        @Override
        public CategoryVo01 mapRow(ResultSet rs, int rowNum) throws SQLException{
            return new CategoryVo01(
                    rs.getInt("category_id"),
                    rs.getString("name"),
                    rs.getString("description")
            );
        }
    }
}
