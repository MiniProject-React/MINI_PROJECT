//package com.kh.MINI.admin3.service3;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.kh.MINI.admin3.vo3.MessageDto3;
//import com.kh.MINI.admin3.vo3.SmsRequestDto3;
//import com.kh.MINI.admin3.vo3.SmsResponseDto3;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.tomcat.util.codec.binary.Base64;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.MediaType;
//import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestClientException;
//import org.springframework.web.client.RestTemplate;
//
//import javax.crypto.Mac;
//import javax.crypto.spec.SecretKeySpec;
//import java.io.UnsupportedEncodingException;
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.security.InvalidKeyException;
//import java.security.NoSuchAlgorithmException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Random;
//
//@PropertySource("classpath:application.properties")
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class SmsService3 {
//    //휴대폰 인증 번호
//    private final String smsConfirmNum = createSmsKey();
//    private final RedisUtill redisUtil;
//
//    @Value("${naver-cloud-sms.accessKey}")
//    private String accessKey;
//
//    @Value("${naver-cloud-sms.secretKey}")
//    private String secretKey;
//
//    @Value("${naver-cloud-sms.serviceId}")
//    private String serviceId;
//
//    @Value("${naver-cloud-sms.senderPhone}")
//    private String phone;
//
//    public String getSignature(String time) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
//        String space = " ";
//        String newLine = "\n";
//        String method = "POST";
//        String url = "/sms/v2/services/"+ this.serviceId+"/messages";
//        String accessKey = this.accessKey;
//        String secretKey = this.secretKey;
//
//        String message = new StringBuilder()
//                .append(method)
//                .append(space)
//                .append(url)
//                .append(newLine)
//                .append(time)
//                .append(newLine)
//                .append(accessKey)
//                .toString();
//
//        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
//        Mac mac = Mac.getInstance("HmacSHA256");
//        mac.init(signingKey);
//
//        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
//        String encodeBase64String = Base64.encodeBase64String(rawHmac);
//
//        return encodeBase64String;
//    }
//
//    public SmsResponseDto3 sendSms(MessageDto3 messageDto) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
//        String time = Long.toString(System.currentTimeMillis());
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("x-ncp-apigw-timestamp", time);
//        headers.set("x-ncp-iam-access-key", accessKey);
//        headers.set("x-ncp-apigw-signature-v2", getSignature(time)); // signature 서명
//
//        List<MessageDto3> messages = new ArrayList<>();
//        messages.add(messageDto);
//
//        SmsRequestDto3 request = SmsRequestDto.builder()
//                .type("SMS")
//                .contentType("COMM")
//                .countryCode("82")
//                .from(phone)
//                .content("[서비스명 테스트닷] 인증번호 [" + smsConfirmNum + "]를 입력해주세요")
//                .messages(messages)
//                .build();
//
//        //쌓은 바디를 json형태로 반환
//        ObjectMapper objectMapper = new ObjectMapper();
//        String body = objectMapper.writeValueAsString(request);
//        // jsonBody와 헤더 조립
//        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);
//
//        RestTemplate restTemplate = new RestTemplate();
//        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
//        //restTemplate로 post 요청 보내고 오류가 없으면 202코드 반환
//        SmsResponseDto3 smsResponseDto = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+ serviceId +"/messages"), httpBody, SmsResponseDto.class);
//        SmsResponseDto3 responseDto = new SmsResponseDto3(smsConfirmNum);
//        // redisUtil.setDataExpire(smsConfirmNum, messageDto.getTo(), 60 * 3L); // 유효시간 3분
//        return smsResponseDto;
//    }
//
//
//
//    // 인증코드 만들기
//    public static String createSmsKey() {
//        StringBuffer key = new StringBuffer();
//        Random rnd = new Random();
//
//        for (int i = 0; i < 5; i++) { // 인증코드 5자리
//            key.append((rnd.nextInt(10)));
//        }
//        return key.toString();
//    }
//}