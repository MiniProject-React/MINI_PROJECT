package com.kh.MINI.vo;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberVo {
    private String email;
    private String password;
    private String name;
    private Date date;
}
