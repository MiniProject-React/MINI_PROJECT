package com.kh.MINI.admin3.vo3;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartVO3 {
    private int cart_item_id;
    private int user_id;
    private int product_id;
    private int quantity;
    private int custom_id;
}
