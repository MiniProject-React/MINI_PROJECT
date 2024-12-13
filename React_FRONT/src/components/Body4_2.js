import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import AxiosApi01 from "../api/AxiosApi01";
import "../css/Body4_2.css";

function Body2() {
  const scrollContainerRefs = useRef({});
  const [products, setProducts] = useState([]);

  // 카테고리 ID -> 이름 맵핑
  const categoryMap = {
    1: "CPU",
    2: "GPU",
    3: "메인보드",
    4: "RAM",
    5: "SSD",
    6: "파워",
  };

  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosApi01.getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("상품목록 가져오기 실패:", error);
      }
    };
    fetchProducts();
  }, []);

  // 카테고리별 상품 정렬
  const sortProductByCategory = () => {
    const categorizedProducts = products.reduce((acc, product) => {
      const categoryId = product.category_id; // 카테고리 ID 확인
      if (!acc[categoryId]) {
        acc[categoryId] = []; // 새로운 카테고리 배열 생성
      }
      acc[categoryId].push(product); // 카테고리 ID에 맞는 상품 추가
      return acc;
    }, {});
    return categorizedProducts;
  };

  const handleMouseDown = (e, categoryId) => {
    const container = scrollContainerRefs.current[categoryId];
    container.isDragging = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeft = container.scrollLeft || 0;
  };

  const handleMouseMove = (e, categoryId) => {
    const container = scrollContainerRefs.current[categoryId];
    if (!container.isDragging) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 1.2; // 스크롤 속도 조절
    container.scrollLeft -= walk;
  };

  const handleMouseUpOrLeave = (categoryId) => {
    const container = scrollContainerRefs.current[categoryId];
    if (container) container.isDragging = false;
  };

  const categorizedProducts = sortProductByCategory();

  return (
    <div className="body2-wrapper">
      {Object.keys(categorizedProducts).map((categoryId) => {
        const categoryName = categoryMap[categoryId] || "기타";
        const categoryProducts = categorizedProducts[categoryId]; // 각 카테고리의 상품들

        return (
          <div className="product-section" key={`category-${categoryId}`}>
            <h2 className="section-title">
              <Link to={`/product/sorted/${categoryId}`}>{categoryName}</Link>
            </h2>
            <div
              className="body2-container"
              ref={(el) => (scrollContainerRefs.current[categoryId] = el)}
              onMouseDown={(e) => handleMouseDown(e, categoryId)}
              onMouseMove={(e) => handleMouseMove(e, categoryId)}
              onMouseUp={() => handleMouseUpOrLeave(categoryId)}
              onMouseLeave={() => handleMouseUpOrLeave(categoryId)}
            >
              {categoryProducts.map((product) => (
                <div
                  className="body2-box"
                  key={`product-${product.product_id}`}
                >
                  <div className="image-section">
                    <Link to={`/product/${categoryId}/${product.product_id}`}>
                      <img
                        src={`/images/${categoryMap[categoryId]}/${product.name}.jpg`}
                        alt={product.name}
                      />
                    </Link>
                  </div>
                  <div className="description-section">
                    <Link to={`/product/${categoryId}/${product.product_id}`}>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="load-more-container">
              <Link
                to={`/product/sorted/${categoryId}`}
                className="load-more-btn"
              >
                더 보러가기
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Body2;
