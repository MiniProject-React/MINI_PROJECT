package com.kh.MINI.ownPcCartAndBuy1;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class CustomOrderRequest {
    private int userId;
    private double totalPrice;
    private List<ProductDetail> productDetails;
}
