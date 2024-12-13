package com.kh.MINI.computer2.vo;

import java.util.List;

public class OrderVO {

    private String orderNumber;
    private double total;
    private List<ItemVO> items; // 아이템 목록

    // Constructor
    public OrderVO(String orderNumber, double total, List<ItemVO> items) {
        this.orderNumber = orderNumber;
        this.total = total;
        this.items = items;
    }

    // Getter and Setter methods
    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        if (total < 0) {
            throw new IllegalArgumentException("Total price cannot be negative");
        }
        this.total = total;
    }

    public List<ItemVO> getItems() {
        return items;
    }

    public void setItems(List<ItemVO> items) {
        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException("Items list cannot be null or empty");
        }
        this.items = items;
    }

    // Optional: toString method for easier debugging
    @Override
    public String toString() {
        return "OrderVO{" +
                "orderNumber='" + orderNumber + '\'' +
                ", total=" + total +
                ", items=" + items +
                '}';
    }
}
