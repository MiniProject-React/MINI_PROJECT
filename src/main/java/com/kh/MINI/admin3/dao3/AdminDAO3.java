package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.UserVO3;
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
public class AdminDAO3 {
    private final JdbcTemplate jdbcTemplate;
    private static final String LOGIN_QUERY = "SELECT COUNT(*) FROM users WHERE email = ? AND password =?";
    private static final String SIGNUP_QUERY =
            "INSERT INTO users (email, password, username, phone_number, address, role) " +
                    "VALUES (?, ?, ?, ?, ?, 0)";
    private static final String CHECK_EMAIL = "SELECT COUNT(*) FROM USERS WHERE email = ?";
    private static final String CHECK_GRADE = "SELECT role , username FROM USERS WHERE email = ? AND password = ?";

    // 로그인
    public boolean login(String email, String password) {
        try{
            int count = jdbcTemplate.queryForObject(LOGIN_QUERY, new Object[]{email, password},Integer.class);
            return count > 0;
        } catch(DataAccessException e) {
            log.error("로그인 조회 실패");
            return false;
        }
    }

    // 등급 체크
    public List<UserVO3> gradeCheck(String email, String password) {
        try {

            return jdbcTemplate.query(CHECK_GRADE, new UserRowMapper(), email, password);
        } catch (DataAccessException e) {
            log.error("권한 검색 실패", e);
            throw e;
        }
    }


    // 회원 가입
    public boolean signup(UserVO3 vo) {
        try {
            int result = jdbcTemplate.update(SIGNUP_QUERY, vo.getEmail(), vo.getPassword(), vo.getUsername(), vo.getPhone_number(), vo.getAddress());
            return result > 0;
        } catch (DataAccessException e) {
            log.error("회원 가입 중 예외 발생", e);
            return false;
        }
    }

    // 회원 가입 여부 확인
    public boolean isEmailExist(String email) {
        try{
            int count = jdbcTemplate.queryForObject(CHECK_EMAIL, new Object[]{email}, Integer.class );
            return count >0;
        } catch (DataAccessException e) {
            log.error("이메일 존재 여부 확인중 에러", e);
            return false;
        }
    }


    private static class UserRowMapper implements RowMapper<UserVO3> {
        @Override
        public UserVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            UserVO3 user = new UserVO3();
            user.setRole(rs.getInt("role"));
            user.setUsername(rs.getString("username"));
            return user;
        }
    }

}
