//package com.kh.MINI.admin3.controller3;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.kh.MINI.admin3.service3.SmsService3;
//import com.kh.MINI.admin3.vo3.MessageDto3;
//import com.kh.MINI.admin3.vo3.SmsResponseDto3;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.UnsupportedEncodingException;
//import java.net.URISyntaxException;
//import java.security.InvalidKeyException;
//import java.security.NoSuchAlgorithmException;
//
//@RequiredArgsConstructor
//@RestController
//public class SmsController3 {
//
//    private final SmsService3 smsService;
//
//    @PostMapping("/sms/send")
//    public SmsResponseDto3 sendSms(@RequestBody MessageDto3 messageDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
//        SmsResponseDto3 responseDto = smsService.sendSms(messageDto);
//        return responseDto;
//    }
//}