package com.kh.MINI.controller;

import com.kh.MINI.vo.MemberVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/get-api")
public class RestTestController {
    @GetMapping("/hello")
    public String getHello(){
        return "안녕하에요. Rest API의 기본동작입니다.";
    }
    // URL 경로에 값을 포함하여 전송하는 방식
    @GetMapping("/board/{number}")
    public String getPathVariable(@PathVariable String number){
        return "요청받은 게시글 번호 : " + number;
    }
    // 쿼리형식으로 값을 전달하는 방식 (RequestParam)
    @GetMapping("/search")
    public String getRequestParam(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password){
        return "이름 : " + name + ", 이메일 : " + email + ". 패스워드 : " + password;
    }
    // 쿼리형식으로 값을 전달하는데 객체로 받는 방식
    @GetMapping("/search2")
    public String getRequestParam2(MemberVo vo){
        return vo.toString();
    }
}
