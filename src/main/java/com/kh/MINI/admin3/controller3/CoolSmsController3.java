package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Balance;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.request.MessageListRequest;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.MessageListResponse;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.10.20:3000"})
@RestController
@Slf4j
@RequiredArgsConstructor
public class CoolSmsController3 {

    final DefaultMessageService messageService;
    private String generatedCode = "";
    public CoolSmsController3() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize("NCSTAAFXR1NVJISE", "NRDTLAJN8MLROE3QBFXWQ4BZHN7VZF34", "https://api.coolsms.co.kr");
    }

    /**
     * 단일 메시지 발송 예제
     */
    @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(@RequestBody UserVO3 vo) {
        System.out.printf("send-one : %s",vo);
        log.info("phone_number : {}",vo);
        String phone = vo.getPhone_number();
        // 하이픈 제거
        String cleanedPhoneNumber = phone.replaceAll("-", "");

        Message message = new Message();
        // 발신번호 및 수신번호 설정 (발신번호는 반드시 설정되어야 함)
        // 인증 번호 생성 및 저장
        generatedCode = createNumber();

        // 발송 메시지 준비
        message.setFrom("01090277477");
        message.setTo(cleanedPhoneNumber);
        message.setText("인증 번호: " + generatedCode);

        // SMS 전송
        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);  // 응답 출력

        return response;  // 응답 반환
    }

    // 6자리 인증번호 생성
    public static String createNumber() {
        int code = (int) (Math.random() * 900000) + 100000;  // 6자리 인증 번호 생성
        return String.valueOf(code);  // 문자열로 변환하여 반환
    }

    @PostMapping("/verify-code")
    public Map<String, Object> verifyCode(@RequestBody Map<String, String> params) {
        Map<String, Object> responseMap = new HashMap<>();
        String inputCode = params.get("inputCode");  // inputCode 값을 가져옵니다.

        if (generatedCode.equals(inputCode)) {
            responseMap.put("status", "success");
            responseMap.put("message", "인증 성공");
        } else {
            responseMap.put("status", "failure");
            responseMap.put("message", "인증 실패");
        }

        return responseMap;
    }

}
