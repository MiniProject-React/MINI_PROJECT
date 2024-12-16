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
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.10.20:3000"})
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
        log.info("백단에서 확인하는 (컨트롤러) 상품 이름{} : ", vo.getName());
        boolean isSuccess = productsDAO3.productName(vo.getName());
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

    // 주문 추가시 상품 검색
    @GetMapping("/order_products")
    public Map<String, Object> order_products(@RequestParam Map<String, Object> paramMap){
        Map<String, Object> resultMap = new HashMap<>();
        //List<ProductsVO3> order_products = productsDAO3.order_products();
        System.out.println(paramMap);
        int currentPage = Integer.parseInt((String) paramMap.get("currentPage"));
        int pageSize = Integer.parseInt((String) paramMap.get("pageSize"));
        int pageIndex = (currentPage - 1) * pageSize;

        String searchCategoryStr = (String) paramMap.get("searchCategory");
        int searchCategory =-1;

        if(searchCategoryStr != null && !searchCategoryStr.isEmpty()) {
            try{
                searchCategory = Integer.parseInt(searchCategoryStr);
            }catch (NumberFormatException e) {
                log.error("잘못된  형식의 searchCategory : {}", searchCategoryStr);
            }
        } else {
            log.warn("searchCategory 값이 null 또는 빈문자입니다.");
        }
        paramMap.put("pageIndex", pageIndex);
        paramMap.put("pageSize", pageSize);
        paramMap.put("searchCategory", searchCategory);
        resultMap.put("cpage", currentPage);

        String searchKeyword = (String) paramMap.get("searchKeyword");
        String searchCondition = (String) paramMap.get("searchCondition");

        // 검색어가 없고 전체 조회일 경우
        if (Objects.equals(searchKeyword, "") && searchCategory == -1) {
            // 검색어와 카테고리 조건이 없을 경우
            List<ProductsVO3> order_products = productsDAO3.order_products(paramMap);
            resultMap.put("order_products", order_products);
            int totalCount = productsDAO3.totalCount(paramMap);
            resultMap.put("totalCount", totalCount);
        } else if (Objects.equals(searchKeyword, "") && searchCategory != -1) {
            // 검색어는 없고 카테고리 조건이 있을 때
            List<ProductsVO3> noSearchKeywordProductList = productsDAO3.noSearchKeywordProductList(paramMap);
            resultMap.put("order_products", noSearchKeywordProductList);
            int noSearchKeywordProductCount = productsDAO3.noSearchKeywordProductCount(paramMap);
            resultMap.put("totalCount", noSearchKeywordProductCount);
        } else if (searchKeyword != null && !searchKeyword.isEmpty()) {
            // 검색어가 있을 경우
            List<ProductsVO3> searchKeywordProductList = productsDAO3.searchKeywordProductList(paramMap);
            resultMap.put("order_products", searchKeywordProductList);
        }


        return resultMap;
    }
}