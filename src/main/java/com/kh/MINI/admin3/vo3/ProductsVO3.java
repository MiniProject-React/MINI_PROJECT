package com.kh.MINI.admin3.vo3;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductsVO3 {
    private int product_id;
    private String name;
    private String description;
    private int price;
    private int stock;
    private String image_url;
    private int category_id;
    private String product;
    private String category;
}
