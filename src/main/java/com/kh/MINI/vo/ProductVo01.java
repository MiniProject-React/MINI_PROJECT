package com.kh.MINI.vo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class ProductVo01 {
    private int productId;
    private String name;
    private String description;
    private int price;
    private int stock;
    private String imageUrl;
    private int categoryId;
}
