package com.kh.MINI.order01;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String name;
    private String phone;
    private String email;
    private String postalCode;
    private String address;
    private String cardNumber;
    private String status;
    private int userId;
    private List<OrderDetailsDTO> items;

    // Getters and Setters
}