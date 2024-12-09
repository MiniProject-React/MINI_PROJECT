package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.ProductsDAO3;
import com.kh.MINI.admin3.vo3.CategoriesVO3;
import com.kh.MINI.admin3.vo3.ProductsVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductsController3 {
    private final ProductsDAO3 productsDAO3;

    // 카테고리 별로 분류된 제품 목록
    @GetMapping("/list")
    public Map<String, Object> productList() {
        Map<String, Object> resultMap = new HashMap<>();
        List<ProductsVO3> allProducts = productsDAO3.getAllProducts();
        Map<String, List<ProductsVO3>> categorizedProducts = allProducts.stream()
                .collect(Collectors.groupingBy(product -> String.valueOf(product.getCategory_id())));
        resultMap.put("cpu", categorizedProducts.get("1"));
        resultMap.put("gpu", categorizedProducts.get("2"));
        resultMap.put("main", categorizedProducts.get("3"));
        resultMap.put("ram", categorizedProducts.get("4"));
        resultMap.put("ssd", categorizedProducts.get("5"));
        resultMap.put("power", categorizedProducts.get("6"));


        return resultMap;

    }

    // 상품 상세 페이지
    @GetMapping("/detail")
    public Map<String, Object> productDetail(@RequestParam("productId")int productId) {
        Map<String, Object> resultMap = new HashMap<>();
        List<ProductsVO3> detailList = productsDAO3.detailList(productId);
        resultMap.put("detailList",detailList);
        return resultMap;
    }

    // 상품 수정
    @PostMapping("/update")
    public ResponseEntity<Boolean> productUpdate(@RequestBody ProductsVO3 vo){
        boolean isSuccess = productsDAO3.update(vo);
        return ResponseEntity.ok(isSuccess);
    }

    // 상품 등록
    @PostMapping("/save")
    public ResponseEntity<Boolean> productSave(@RequestBody ProductsVO3 vo) {
        boolean isSuccess = productsDAO3.save(vo);
        return ResponseEntity.ok(isSuccess);
    }

    // 상품 삭제
    @PostMapping("/delete")
    public ResponseEntity<Boolean> productDelete(@RequestBody ProductsVO3 vo) {
        boolean isSuccess = productsDAO3.delete(vo);
        return ResponseEntity.ok(isSuccess);
    }

    // 카테고리 목록 리스트
    @GetMapping("/category")
    public Map<String ,Object> category (){
        Map<String ,Object> resultMap = new HashMap<>();
        List<CategoriesVO3>category = productsDAO3.category();
        resultMap.put("category",category);
        return resultMap;
    }

    // 상품 이름 유효성 검사
    @PostMapping("/product_name")
    public ResponseEntity<Boolean> product_name (@RequestBody ProductsVO3 vo) {
        log.info("백단에서 확인하는 (컨트롤러) 상품 이름{} : ", vo.getProduct());
        boolean isSuccess = productsDAO3.productName(vo.getProduct());
        return ResponseEntity.ok(!isSuccess);
    }

    // 카테고리 이름 조회
    @GetMapping("/category_name")
    public Map<String , Object> category_name (@RequestParam("category_id") int category_id){
        Map<String, Object> resultMap = new HashMap<>();
        List<CategoriesVO3> categoryName= productsDAO3.getCategoryName(category_id);
        resultMap.put("categoryName",categoryName);
        return resultMap;
    }

    // 상품 삭제
    @PostMapping("/delete_product")
    public ResponseEntity<Boolean> delete_product(@RequestBody ProductsVO3 vo) {
        boolean isSuccess = productsDAO3.deleteProduct(vo.getProduct_id());
        return ResponseEntity.ok(isSuccess);
    }
}