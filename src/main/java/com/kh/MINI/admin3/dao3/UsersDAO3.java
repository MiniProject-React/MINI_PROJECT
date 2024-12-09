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
import java.util.Map;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UsersDAO3 {
    
    private final JdbcTemplate jdbcTemplate;

    // 유저 권한 조회
    private static final String ALL_ROLES = "SELECT DISTINCT ROLE FROM USERS";

    // 유저 총 수 조회
    private static final String ALL_USERS_COUNT="SELECT COUNT(*) FROM USERS";

    // 권한에 따른 유저 리스트 조회
    private static final String USER_LIST_BY_ROLE ="SELECT USER_ID, USERNAME, PASSWORD, EMAIL, ROLE, ADDRESS, PHONE_NUMBER " +
            "FROM ( " +
            "  SELECT user_id, username, password, email, role, address, phone_number, " +
            "         ROW_NUMBER() OVER (ORDER BY user_id DESC) AS rn " +
            "  FROM USERS WHERE ROLE = ?" +
            ") " +
            "WHERE rn > ? AND rn <= ?";


    // 전체 회원 조회
    private static final String ALL_USERS =
            "SELECT user_id, username, password, email, role, address, phone_number " +
                    "FROM ( " +
                    "  SELECT user_id, username, password, email, role, address, phone_number, " +
                    "         ROW_NUMBER() OVER (ORDER BY user_id DESC) AS rn " +
                    "  FROM USERS " +
                    ") " +
                    "WHERE rn > ? AND rn <= ?";  // pageIndex와 pageSize로 동적으로 값 설정

    // 회원 삭제
    private static final String DELETE_USERS =
            "DELETE FROM USERS WHERE USER_ID = ?";

    // 키워드가 없을때 권한 만으로 검색된 회원 수 조회
    private static final String USER_COUNT_BY_ROLE ="SELECT COUNT(*) FROM USERS WHERE ROLE =?";

    // 키워드가 있을 때 검색된 회원 수 조회
    private static final String USER_COUNT_BY_SEARCH = "SELECT COUNT(*) FROM USERS WHERE ? = ? AND ROLE = ?";

    // 회원 정보 상세 조회
    private static final String DETAIL_USER_INFO = "SELECT * FROM USERS WHERE USER_ID = ?";

    // 회원 정보 업데이트
    private static final String UPDATE_USER = "UPDATE USERS SET USERNAME = ? , PASSWORD = ? , ADDRESS = ? , PHONE_NUMBER = ? WHERE EMAIL = ?";
    public List<UserVO3> userList(Map<String, Object> paramMap) {
        try {
            // pageIndex와 pageSize를 추출
            int pageIndex = (int) paramMap.get("pageIndex");
            int pageSize = (int) paramMap.get("pageSize");

            // pageIndex와 pageSize 계산
            int startRow = pageIndex;
            int endRow = pageIndex + pageSize;

            // JdbcTemplate을 사용하여 쿼리 실행
            return jdbcTemplate.query(
                    ALL_USERS,
                    new Object[] { startRow, endRow },  // startRow와 endRow를 쿼리에 전달
                    new UserRowMapper()  // 결과를 매핑할 RowMapper
            );
        } catch (DataAccessException e) {
            log.error("유저 리스트 조회 중 오류 발생: ", e);
            throw e;
        }
    }

    // 유저 권한 조회
    public List<UserVO3> roleList() {
        try{
            return jdbcTemplate.query(ALL_ROLES, new UserRoleRowMapper());
        }catch (DataAccessException e){
            log.error("권한 조회중 에러 발생 : ", e);
            throw e;
        }
    }

    // 전체 회원 수 조회
    public int totalCount(Map<String, Object> paramMap) {
        try{
            return jdbcTemplate.queryForObject(ALL_USERS_COUNT, Integer.class);
        }catch (DataAccessException e) {
            log.error("총 회원수 조회중 에러 : ", e);
            throw e;
        }
    }

    // 키워드가 없을 때 권한에 따른 유저 리스트 출력
    public List<UserVO3> noSearchKeywordUserList(Map<String, Object> paramMap) {
        try {
            // pageIndex와 pageSize를 추출
            int pageIndex = (int) paramMap.get("pageIndex");
            int pageSize = (int) paramMap.get("pageSize");
            int searchRole = (int) paramMap.get("searchRole");
            System.out.printf("키워드가 없을 시 권한에 따른 회원 리스트 조회 시 권한 값 확인 : %d ", searchRole);
            // pageIndex와 pageSize 계산
            int startRow = pageIndex;
            int endRow = pageIndex + pageSize;

            if (searchRole == -1){
                // 전체 회원 조회
                return jdbcTemplate.query(
                        ALL_USERS,
                        new Object[] { startRow, endRow },  // startRow와 endRow를 쿼리에 전달
                        new UserRowMapper()  // 결과를 매핑할 RowMapper
                );
            }else {
                // 권한에 따른 리스트 조회
                return jdbcTemplate.query(USER_LIST_BY_ROLE,  new Object[] { searchRole, startRow, endRow },  // startRow와 endRow를 쿼리에 전달
                        new UserRowMapper());// 결과를 매핑할 RowMapper);
            }


        }catch (DataAccessException e) {
            log.error("권한에 따른 유저 리스트 출력시 에러 : ", e);
            throw e;
        }
    }

    // 키워드가 있을 때 유저 리스트 조건 검색
    public List<UserVO3> searchKeywordUserList(Map<String, Object> paramMap) {
        try {
            // pageIndex와 pageSize를 추출
            int pageIndex = (int) paramMap.get("pageIndex");
            int pageSize = (int) paramMap.get("pageSize");
            int searchRole = (int) paramMap.get("searchRole");
            String searchKeyword = (String) paramMap.get("searchKeyword");
            String searchCondition = (String) paramMap.get("searchCondition");

            System.out.printf("searchKeyword : %s", searchKeyword);
            log.info("searchKeyword : {}", searchKeyword);
            log.info("searchCondition : {}", searchCondition);
            System.out.printf("searchCondition : %s", searchCondition);

            // pageIndex와 pageSize 계산
            int startRow = pageIndex;
            int endRow = pageIndex + pageSize;

            if (searchRole == -1) {
                // 전체 + 키워드 검색
                String sql = "SELECT USER_ID, USERNAME, PASSWORD, EMAIL, ROLE, ADDRESS, PHONE_NUMBER " +
                        "FROM ( " +
                        "  SELECT user_id, username, password, email, role, address, phone_number, " +
                        "         ROW_NUMBER() OVER (ORDER BY user_id DESC) AS rn " +
                        "  FROM USERS WHERE " + searchCondition + " LIKE ? " +
                        ") " +
                        "WHERE rn > ? AND rn <= ?";
                String searchKeywordWithWildcard = "%" + searchKeyword + "%";  // LIKE 구문을 위한 와일드카드 추가
                return jdbcTemplate.query(sql, new Object[]{searchKeywordWithWildcard, startRow, endRow},
                        new UserRowMapper()); // 결과를 매핑할 RowMapper
            } else {
                // 권한 + 키워드 검색
                String sql = "SELECT USER_ID, USERNAME, PASSWORD, EMAIL, ROLE, ADDRESS, PHONE_NUMBER " +
                        "FROM ( " +
                        "  SELECT user_id, username, password, email, role, address, phone_number, " +
                        "         ROW_NUMBER() OVER (ORDER BY user_id DESC) AS rn " +
                        "  FROM USERS WHERE " + searchCondition + " LIKE ? AND ROLE = ? " +
                        ") " +
                        "WHERE rn > ? AND rn <= ?";
                String searchKeywordWithWildcard = "%" + searchKeyword + "%";  // LIKE 구문을 위한 와일드카드 추가
                return jdbcTemplate.query(sql, new Object[]{searchKeywordWithWildcard, searchRole, startRow, endRow},
                        new UserRowMapper()); // 결과를 매핑할 RowMapper
            }
        } catch (DataAccessException e) {
            log.error("키워드 검색을 통한 유저리스트 조회시 에러 발생 : ", e);
            throw e;
        }
    }

    // 키워드 검색이 없을 시 검색된 회원수 조회
    public int noSearchKeywordTotalCount(Map<String, Object> paramMap) {
        try{
            int searchRole = (int) paramMap.get("searchRole");
            return jdbcTemplate.queryForObject(USER_COUNT_BY_ROLE, new Object[]{searchRole}, Integer.class);
        }catch (DataAccessException e){
            log.error("권한검색에 따른 회원 조회시 에러 ", e);
            throw e;
        }
    }

    // 회원 삭제
    public boolean delete(String userId) {
        try{
            int result = jdbcTemplate.update(DELETE_USERS,userId);
            return result >0;
        }catch (DataAccessException e) {
            log.error("회원 삭제중 에러 발생 DAO  :" ,e);
            throw e;
        }
    }

    // 회원 상세 정보
    public List<UserVO3> detailUserInfo(int userId) {
        try{
            return jdbcTemplate.query(DETAIL_USER_INFO,new UserRowMapper(), userId);
        }catch (DataAccessException e){
            log.error("상세 회원 정보 조회중 에러 발생",e);
            throw e;
        }
    }

    public boolean update(UserVO3 vo) {
        try{
            int result = jdbcTemplate.update(UPDATE_USER, vo.getUsername(), vo.getPassword(),vo.getAddress(), vo.getPhone_number(), vo.getEmail());
            return result > 0;
        }catch (DataAccessException e){
            log.error("회원 업데이트 중 에러 발생");
            throw e;
        }
    }

    private static class UserRowMapper implements RowMapper<UserVO3>{
        @Override
        public UserVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new UserVO3(
                    rs.getString("user_id"),
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getString("email"),
                    rs.getInt("role"),
                    rs.getString("address"),
                    rs.getString("phone_number")
            );
        }
    }
    private static class UserRoleRowMapper implements RowMapper<UserVO3>{
        @Override
        public UserVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new UserVO3(
                    rs.getInt("role")
            );
        }
    }
}
