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
    private int productId;
    private int quantity;
    private int customId;
    private int userId;

}
