package com.kh.MINI.order01;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDTO {
    private int productId;
    private int quantity;
    private double price;

    // Getters and Setters
}