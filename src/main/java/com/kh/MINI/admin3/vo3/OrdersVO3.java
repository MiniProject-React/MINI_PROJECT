package com.kh.MINI.admin3.vo3;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrdersVO3 {
    // orders 테이블
    private int order_id;
    private int total_price;
    private Date order_date;
    private String status;
    private int user_id;
    // order_details 테이블
    private int detail_id;
    private int quantity;
    private int price;
    private int subtotal;
    private int product_id;
    private int custom_id;
    // 상품 테이블
    private String description;
    private int product_price; // order 테이블의 price와 차별점을 두기 위해서
    private int category_id;
    private String product; // category테이블의 name과 차별점을 두기 위해서
    private String category; // products 테이블의 name과 차별점을 두기 위해서
}
