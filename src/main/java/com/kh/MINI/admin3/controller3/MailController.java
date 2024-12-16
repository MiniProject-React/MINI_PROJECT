package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.UsersDAO3;
import com.kh.MINI.admin3.service3.MailService;
import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.10.20:3000", "http://192.168.10.25:3000"})
public class MailController {

    private final MailService mailService;
    private final UsersDAO3 usersDAO3;
    @ResponseBody
    @PostMapping("/mail")
    public String MailSend(@RequestBody Map<String, String> request) {
        String mail = request.get("mail");  // JSON 객체에서 "mail" 값을 가져옴
        System.out.println(mail);
        int number = mailService.sendMail(mail);
        return "" + number;  // 인증번호 반환
    }
    @ResponseBody
    @PostMapping("/idandpw")
    public ResponseEntity<Boolean> idandpw (@RequestBody Map<String , String > request){
        String username = request.get("username");
        String phone_number = request.get("phone_number");
        
        List<UserVO3> emailAndPw = usersDAO3.emailAndPw(username, phone_number);
        String email = "";
        String password = "";
        for(UserVO3 vo : emailAndPw ) {
            email = vo.getEmail();
            password = vo.getPassword();
        }
        log.info("리스트에서 email추출 : ", email);
        log.info("리스트에서 password 추출 : ",password);
        log.info("이름과 전화번호로 email과 비번 검색", emailAndPw);
        if(!emailAndPw.isEmpty()){
            boolean isSuccess = mailService.idandpw(email, password);
            return ResponseEntity.ok(isSuccess);
        } else {
            return null;
        }
    }

    @ResponseBody
    @PostMapping("/verify")
    public String verifyNumber(@RequestBody Map<String, String> very) {
        System.out.println(very);
        int inputNumber = Integer.parseInt(very.get("inputNumber"));
        String email = very.get("mail");
        boolean isVerified = mailService.verifyNumber(inputNumber,email);
        if (isVerified) {
            return "인증 성공";
        } else {
            return "인증 실패";
        }
    }
}
