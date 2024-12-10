package com.kh.MINI.vo;

import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class ProductWithReviewVo01 {
    private int productId;
    private String name;
    private String description;
    private int price;
    private int stock;
    private String imageUrl;
    private int categoryId;
    private double avgRating;
    private int reviewCount;


}
