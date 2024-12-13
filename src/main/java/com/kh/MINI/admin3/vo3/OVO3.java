package com.kh.MINI.admin3.vo3;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OVO3 {
    private int order_id;
    private int total_price;
    private Date order_date;
    private String status;
    private int user_id;
}
