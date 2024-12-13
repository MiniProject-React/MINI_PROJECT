import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import AxiosApi01 from "../api/AxiosApi01";
import "../css/Body4_2.css";
import HorizontalScrollList01 from "./HorizontalScrollList01";

function Body2() {
  const [categories, setCategories] = useState([]);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AxiosApi01.getCategoryList();
        setCategories(response.data); // 카테고리 데이터 설정
        console.log("Categories:", response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="body2-wrapper">
      {categories &&
        categories.map((category) => (
          <HorizontalScrollList01
            key={category.categoryId}
            categoryId={category.categoryId}
            categoryName={category.name}
          />
        ))}
    </div>
  );
}

export default Body2;
