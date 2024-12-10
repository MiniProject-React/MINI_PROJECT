package com.kh.MINI.controller;

import com.kh.MINI.dao.CategoryDao01;
import com.kh.MINI.vo.CategoryVo01;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequiredArgsConstructor
public class CategoryController01 {
    @Autowired
    private final CategoryDao01 categoryDao01;

    @GetMapping("/category")
    public List<CategoryVo01> getCategoryList() {
        log.info("GET /category 요청 수신");
        return categoryDao01.categoryList();
    }
}
