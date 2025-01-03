package com.kh.MINI.admin3.service3;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;


import java.util.Properties;

@Service
@RequiredArgsConstructor
public class MailService {

    private static final String senderEmail = "gigattfyhig@gmail.com";
    private static int number;  // 인증 번호
    private static String userMail; // 인증번호를 보낸 이메일 저장
    private static String Password;

    // JavaMailSender를 수동으로 설정하는 메서드
    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);  // 587 포트 (STARTTLS 포트)
        mailSender.setUsername("gigattfyhig@gmail.com");
        mailSender.setPassword("orlcyaygfqssnuzn");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", "true");  // STARTTLS 활성화
        props.put("mail.smtp.auth", "true");  // SMTP 인증 활성화
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");  // SSL 프로토콜 설정

        return mailSender;
    }

    public static void createNumber(String mail) {
        number = (int) (Math.random() * (90000)) + 100000;  // 6자리 인증 번호
        userMail = mail;  // 인증번호를 보낸 이메일 저장
    }

    public MimeMessage CreateMail(String mail) {
        createNumber(mail);
        JavaMailSender mailSender = getMailSender();
        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body, "UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    public int sendMail(String mail) {
        MimeMessage message = CreateMail(mail);
        JavaMailSender mailSender = getMailSender();
        mailSender.send(message);
        return number;
    }

    // 인증번호 검증 메서드 추가
    public boolean verifyNumber( int enteredNumber, String mail) {
        return userMail.equals(mail) && number == enteredNumber;
    }

    public boolean idandpw(String mail, String password) {
        Password = password;
        try {
            MimeMessage message = SendIdAndPassword(mail);
            JavaMailSender mailSender = getMailSender();
            mailSender.send(message);  // 이메일 전송 시도

            return true;  // 전송 성공 시 true 반환
        } catch (Exception e) {
            // 이메일 전송 실패 시 예외 처리
            e.printStackTrace();
            return false;  // 전송 실패 시 false 반환
        }
    }


    private MimeMessage SendIdAndPassword(String mail) {
        JavaMailSender mailSender = getMailSender();
        MimeMessage message = mailSender.createMimeMessage();
        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("PW 확인");
            String body = "";
            body += "<h3>" + "요청하신 password 입니다." + "</h3>";
            body += "<h1>" + Password + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body, "UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }
}
