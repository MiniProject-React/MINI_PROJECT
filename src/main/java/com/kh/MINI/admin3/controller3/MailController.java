package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.service3.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")

public class MailController {

    private final MailService mailService;

    @ResponseBody
    @PostMapping("/mail")
    public String MailSend(@RequestBody Map<String, String> request) {
        String mail = request.get("mail");  // JSON 객체에서 "mail" 값을 가져옴
        System.out.println(mail);
        int number = mailService.sendMail(mail);
        return "" + number;  // 인증번호 반환
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
