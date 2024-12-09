//package com.kh.MINI.controller;
//
//
//import com.kh.MINI.dao.MemberDao;
//import com.kh.MINI.vo.MemberVo;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@Slf4j
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class AuthController {
//    private final MemberDao memberDao;
//
//    // 로그인
//    @PostMapping("/login")
//    public ResponseEntity<Boolean> login(@RequestBody MemberVo vo){
//        //log.info("memberVo:{}", vo);
//        log.error("이메일 : {} ", vo.toString());
//        log.error("비밀번호 : {}", vo.getPassword());
//        boolean inSuccess = memberDao.login(vo.getEmail(), vo.getPassword());
//        return ResponseEntity.ok(inSuccess);
//        //return ResponseEntity.ok(true);
//    }
//
//    // 회원가입
//    @PostMapping("/signup")
//    public ResponseEntity<Boolean> signup(@RequestBody MemberVo vo){
////        log.info("memberVo:{}", vo);
////        log.info("이메일 : "+ vo.getEmail());
////        log.info("이메일 : {} ", vo.getEmail());
////        log.info("패스워드 : "+ vo.getPassword());
////        log.info("이메일 : {} ", vo.getPassword());
////        log.info("이름 : "+ vo.getName());
////        log.info("이메일 : {} ", vo.getName());
////        log.info("member: {}", vo);
////        return ResponseEntity.ok(true);
//
//        log.error("member : {}",vo);
//        boolean inSuccess = memberDao.signup(vo);
//        return ResponseEntity.ok(inSuccess);
//    }
//
//    // 가입여부 확인
//    @GetMapping("/exists/{email}")
//    public ResponseEntity<Boolean> exists(@PathVariable("email") String email){
//        log.error("email : {}",email);
//        boolean isExist = memberDao.isEmailExist(email);
//        log.error("이메일 존재 여부 : {}", isExist);  // 반환 값 로그
//        return ResponseEntity.ok(isExist);
//    }
//}
