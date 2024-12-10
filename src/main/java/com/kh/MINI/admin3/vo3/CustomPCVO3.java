package com.kh.MINI.admin3.vo3;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomPCVO3 {
    // custom order 테이블
    private int custom_id;
    private int total_price;
    private int user_id;
    // custom order detail 테이블
    private int detail_id;
    private int quantity;
    private int price;
    private int subtotal;
    private int product_id;
    // order 테이블
    private int order_id;
    private int total; // 전체 주문 토탈
    private Timestamp order_date;
    private String status;
    // products 테이블
    private String product; // 상품 이름
    // categories 테이블
    private String category;
    private int category_id;

}
