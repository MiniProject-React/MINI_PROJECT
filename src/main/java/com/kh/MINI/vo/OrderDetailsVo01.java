package com.kh.MINI.vo;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class OrderDetailsVo01 {
    private int detailId;
    private int quantity;
    private int price;
    private Integer productId;
    private Integer customId;
    private int orderId;
}
