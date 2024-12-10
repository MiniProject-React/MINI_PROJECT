package com.kh.MINI.vo;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class CartVo01 {
    private int cartItemId;
    private int userId;
    private int productId;
    private int quantity;
    private String productName;
    private String productDescription;
    private double productPrice;
    private int productStock;
    private String productImageUrl;
    private Integer customId;
    private Double customPrice;
}
