package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.AdminDAO3;
import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/auth")
@RequiredArgsConstructor
// 회원 사진? 그리고 회원 주소, 전화 번호
public class AuthController3 {
    private final AdminDAO3 adminDAO3;

    //로그인
    @GetMapping("/roleCheck")
    public Map<String, Object> roleCheck(@RequestParam String email, @RequestParam String password) {
        Map<String, Object> resultMap = new HashMap<>();
        Integer roleCheck = adminDAO3.gradeCheck(email, password);  // Integer로 타입 명시
        resultMap.put("roleCheck", roleCheck);
        System.out.println(roleCheck);
        return resultMap;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserVO3 vo) {
        Map<String, Object> resultMap = new HashMap<>();
        log.info("ID {}", vo.getEmail());
        log.info("패스워드 {}", vo.getPassword());

        boolean isSuccess = adminDAO3.login(vo.getEmail(),vo.getPassword());
        return ResponseEntity.ok(isSuccess);
    }
    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody UserVO3 vo){
        log.info("가입 {}",vo);
        boolean isSuccess = adminDAO3.signup(vo);
        return ResponseEntity.ok(isSuccess);
    }
    // 가입 여부 확인
    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> exists(@PathVariable String email) {
        log.error("email : {}", email );
        boolean isExist = adminDAO3.isEmailExist(email);
        return ResponseEntity.ok(!isExist);
    }


}
