package com.kh.MINI.ownPcCartAndBuy1;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomOrderService {

    private final CustomOrderRepository customOrderRepository;
    private final CustomOrderDetailRepository customOrderDetailRepository;
    private final CartItemRepository cartItemRepository;

    public CustomOrderService(CustomOrderRepository customOrderRepository,
                              CustomOrderDetailRepository customOrderDetailRepository,
                              CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
        this.customOrderDetailRepository = customOrderDetailRepository;
        this.customOrderRepository = customOrderRepository;
    }

    @Transactional
    public void createCustomOrder(int userId, double totalPrice,
                                  List<ProductDetail> productDetails) {
        // 1. 커스텀 오더 생성
        int customOrderId = customOrderRepository.createCustomOrder(userId, totalPrice);

        // 2. 커스텀 오더 디테일 생성
        for (ProductDetail detail : productDetails) {
            customOrderDetailRepository.createCustomOrderDetail(
                    customOrderId, detail.getProductId(), detail.getQuantity(), detail.getPrice());
        }

        // 3. 장바구니 아이템 생성
        for (ProductDetail detail : productDetails) {
            cartItemRepository.createCartItem(userId, detail.getProductId(), detail.getQuantity(), customOrderId);
        }
    }
}
