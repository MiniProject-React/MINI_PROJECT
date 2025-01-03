package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.AdminDAO3;
import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.10.20:3000", "http://192.168.10.25:3000"})
@RequestMapping("/auth")
@RequiredArgsConstructor
// 회원 사진? 그리고 회원 주소, 전화 번호
public class AuthController3 {
    private final AdminDAO3 adminDAO3;

    //로그인
    @GetMapping("/roleCheck")
    public Map<String, Object> roleCheck(@RequestParam(value="email") String email, @RequestParam(value = "password") String password) {
        Map<String, Object> resultMap = new HashMap<>();
        List<UserVO3> roleCheck = adminDAO3.gradeCheck(email, password);  // Integer로 타입 명시
        resultMap.put("roleCheck", roleCheck);
        return resultMap;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserVO3 vo) {
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
    public ResponseEntity<Boolean> exists(@PathVariable("email") String email) {
        log.error("email : {}", email );
        boolean isExist = adminDAO3.isEmailExist(email);
        return ResponseEntity.ok(!isExist);
    }

    // 아이디 비밀번호 찾기시 이름과 폰 번호 조회
    @GetMapping("/name_and_phone")
    public ResponseEntity<Boolean> name_and_phone (@RequestParam(value= "username") String username, @RequestParam(value="phone_number") String phone){
        boolean isExist = adminDAO3.isOurMember(username, phone);
        return ResponseEntity.ok(isExist);
    }

}
