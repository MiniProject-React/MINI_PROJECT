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
    private int category_id;
    private String product;
    private String category;
    private int stock;
    private String image_url;

    public ProductsVO3(int productId, String product, String description, int price, int stock, String product1, int categoryId, String product2, String category) {
    }
}
