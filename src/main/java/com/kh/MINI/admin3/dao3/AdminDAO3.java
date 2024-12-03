package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class AdminDAO3 {
    private final JdbcTemplate jdbcTemplate;
    private static final String LOGIN_QUERY = "SELECT COUNT(*) FROM users WHERE email = ? AND password =?";
    private static final String SIGNUP_QUERY =
            "INSERT INTO users (user_id, email, password, username, phone_number, address, role) " +
                    "VALUES (USER_SEQ.nextval, ?, ?, ?, ?, ?, 0)";
    private static final String CHECK_EMAIL = "SELECT COUNT(*) FROM USERS WHERE email = ?";
    private static final String CHECK_GRADE = "SELECT role FROM USERS WHERE email = ? AND password =?";
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

    public Integer gradeCheck(String email, String password) {
        System.out.println(email);
        System.out.println(password);
        try {
            // 쿼리 실행, 반환된 값은 Integer로 처리
            return jdbcTemplate.queryForObject(CHECK_GRADE, new Object[]{email, password}, Integer.class);
        } catch (DataAccessException e) {
            log.error("권한 검색 실패", e);
            return null;
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
}
