package com.kh.MINI.vo;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class OrderVo01 {
    private int orderId;
    private String shippingAddress;
    private Date orderDate;
    private String status;
    private int userId;
    private String email;
    private String userName;
}
