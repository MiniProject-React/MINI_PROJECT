package com.kh.MINI.admin3.vo3;


import lombok.*;

import java.sql.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class UserVO3 {
    private String user_id;
    private String username;
    private String password;
    private String email;
    private int role;
    private Date create_at;
    private String address;
    private String phone_number;
}
