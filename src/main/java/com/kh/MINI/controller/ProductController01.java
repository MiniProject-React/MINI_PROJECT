package com.kh.MINI.controller;

import com.kh.MINI.dao.ProductDao01;
import com.kh.MINI.vo.ProductVo01;
import com.kh.MINI.vo.ProductWithReviewVo01;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequiredArgsConstructor
public class ProductController01 {

    @Autowired
    private final ProductDao01 productDao;

    @GetMapping("/products")
    public List<ProductVo01> getAllProducts() {
        return productDao.productList();
    }
    @GetMapping("/products/category/{categoryId}")
    public ResponseEntity<List<ProductVo01>> getProductsByCategory(@PathVariable("categoryId") String categoryId) {
        List<ProductVo01> productList = productDao.productListByCategory(categoryId);
        return ResponseEntity.ok(productList);  // 200 OK 상태 코드와 함께 productList를 반환
    }
    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductVo01> getProductById(@PathVariable("productId") String productId) {
        List<ProductVo01> productList = productDao.productById(productId);
        System.out.print("받아서 출력하는 상품 ID: " + productId);
        return ResponseEntity.ok(productList.get(0));
    }

    @GetMapping("/products/sorted")
    public List<Map<String, Object>> getSortedProducts(
            @RequestParam(value = "categoryId", defaultValue = "1") String categoryId,
            @RequestParam(value = "sortColumn", defaultValue = "price") String sortColumn,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        // 서비스 메서드를 호출하여 정렬된 제품 리스트를 가져옵니다.
        return productDao.getProductsSorted(categoryId, sortColumn, sortOrder);
    }
}
