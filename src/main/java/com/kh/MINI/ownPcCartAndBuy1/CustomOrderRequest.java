package com.kh.MINI.ownPcCartAndBuy1;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class CustomOrderRequest {
    private String userEmail;
    private Double totalPrice;
    private List<CustomOrderDetail> productDetails;

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class CustomOrderDetail {
        private Long productId;
        private int quantity;
        private Double price;
    }
}
