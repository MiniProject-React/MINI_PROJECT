package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.UsersDAO3;
import com.kh.MINI.admin3.vo3.ResponseMessage;
import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController3 {
    private final UsersDAO3 usersDAO3;

    // 유저 리스트 조회
    @GetMapping("/list")
    public Map<String, Object> userList(@RequestParam Map<String, Object> paramMap) {
        Map<String, Object> resultMap = new HashMap<>();

        int currentPage = Integer.parseInt((String) paramMap.get("currentPage"));
        int pageSize = Integer.parseInt((String) paramMap.get("pageSize"));
        int pageIndex = (currentPage - 1) * pageSize;

        String searchRoleStr = (String) paramMap.get("searchRole");
        int searchRole = -1; // 기본값 설정 (필요시 다른 값으로 설정)

        if (searchRoleStr != null && !searchRoleStr.isEmpty()) {
            try {
                searchRole = Integer.parseInt(searchRoleStr);
            } catch (NumberFormatException e) {
                log.error("잘못된 형식의 searchRole: {}", searchRoleStr);
            }
        } else {
            log.warn("searchRole 값이 null 또는 빈 문자열입니다.");
        }

        paramMap.put("pageIndex", pageIndex);
        paramMap.put("pageSize", pageSize);
        paramMap.put("searchRole", searchRole);

        String searchKeyword = (String) paramMap.get("searchKeyword");
        String searchCondition = (String) paramMap.get("searchCondition");
        // 검색어가 없고 전체 조회일 경우
        if (Objects.equals(searchKeyword, "") && searchRole == -1) {
            List<UserVO3> userList = usersDAO3.userList(paramMap);
            resultMap.put("userList", userList);
            int totalCount = usersDAO3.totalCount(paramMap);
            resultMap.put("totalCount", totalCount);
        // 검색어가 없고 조건부 조회일 경우
        } else if (Objects.equals(searchKeyword, "") && searchRole != -1){
            List<UserVO3> noSearchKeywordUserList = usersDAO3.noSearchKeywordUserList(paramMap);
            resultMap.put("userList", noSearchKeywordUserList);
            int noSearchKeywordTotalCount = usersDAO3.noSearchKeywordTotalCount(paramMap);
            resultMap.put("totalCount", noSearchKeywordTotalCount);
        // 검색어 조회일 경우
        } else {
            List<UserVO3> searchKeywordUserList = usersDAO3.searchKeywordUserList(paramMap);
            resultMap.put("userList", searchKeywordUserList);
            // 검색어 조회일 경우 totalCount
        }

        log.info("paramMap : {}", paramMap);
        System.out.println(paramMap);
        System.out.printf("권한 값: %d ", searchRole);
        System.out.printf("키워드 값 : %s ", searchKeyword);
        System.out.printf("이름 이메일 조건 값  : %s ", searchCondition);

        resultMap.put("cpage", currentPage);
        resultMap.put("pageSize", pageSize);

        return resultMap;
    }


    // 유저 권한 조회
    @GetMapping("/role")
    public Map<String, Object> roleList() {
        Map<String, Object> resultMap = new HashMap<>();
        List<UserVO3> roleList = usersDAO3.roleList();
        resultMap.put("roleList",roleList);
        return resultMap;
    }

    // 유저 삭제
    @PostMapping("/delete")
    public ResponseEntity<ResponseMessage> userDelete (@RequestBody UserVO3 vo) {
        boolean isSuccess = usersDAO3.delete(vo.getUser_id());

        String message;
        if (isSuccess) {
            message = "회원 삭제 성공";
        } else {
            message = "회원 삭제 실패";
        }

        ResponseMessage responseMessage = new ResponseMessage(isSuccess, message);
        return ResponseEntity.ok(responseMessage);
    }

    // 유저 상세 정보 조회
    @GetMapping("/detailUser")
    public Map<String, Object> detailUser (@RequestParam  int user_id) {
        System.out.printf("detailUser : %d",user_id);
        Map<String, Object> resultMap = new HashMap<>();
        List<UserVO3> detailUser = usersDAO3.detailUserInfo(user_id);
        resultMap.put("detailUser",detailUser);
        return resultMap;
    }

    // 유저 정보 업데이트
    @PostMapping("/userupdate")
    public ResponseEntity<Boolean> userupdate(@RequestBody UserVO3 vo) {
        boolean isSuccess = usersDAO3.update(vo);
        return ResponseEntity.ok(isSuccess);
    }

}
