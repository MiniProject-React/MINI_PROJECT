import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/HorizontalScrollList01.css";
import AxiosApi01 from "../api/AxiosApi01";
import { storage } from "../api/firebase"; // firebase.js에서 storage를 가져옵니다.
import { ref, getDownloadURL } from "firebase/storage"; // getDownloadURL과 ref를 가져옵니다.
import { debounce } from "lodash";

function HorizontalScrollList01({ categoryId, categoryName }) {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [isAtEnd, setIsAtEnd] = useState(false); // 스크롤 끝 감지 상태
  const [isButtonVisible, setIsButtonVisible] = useState(false); // '더 보기' 버튼 상태
  const scrollContainerRef = useRef(null);

  // 상품 리스트 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosApi01.getProductByCategoryId(categoryId);
        // 상품 리스트가 null인 경우 빈 배열로 설정
        if (response.data) {
          setProducts(response.data.slice(0, 5)); // 첫 5개만 표시

          // 각 제품의 이미지 URL을 Firebase에서 가져오기
          const newImageUrls = {};
          for (let product of response.data) {
            const imageRef = ref(
              storage,
              `images/${categoryName}/${product.name}.jpg`
            );
            try {
              const imageUrl = await getDownloadURL(imageRef);
              newImageUrls[product.productId] = imageUrl;
            } catch (error) {
              console.error("Failed to get image URL:", error);
            }
          }
          setImageUrls(newImageUrls); // 이미지 URL 상태 업데이트
        } else {
          setProducts([]); // 상품 데이터가 없으면 빈 배열로 설정
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [categoryId, categoryName]);

  // 스크롤 끝 감지
  const handleScroll = debounce(() => {
    const container = scrollContainerRef.current;
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10;
    setIsAtEnd(isAtEnd); // isAtEnd 상태 업데이트
    setIsButtonVisible(isAtEnd); // 스크롤 끝에 도달하면 버튼 표시
  }, 100); // 100ms 간격으로 호출

  // 스크롤 드래그 핸들러
  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    container.isDragging = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeft = container.scrollLeft || 0;
  };

  const handleMouseMove = (e) => {
    const container = scrollContainerRef.current;
    if (!container.isDragging) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 1.5; // 스크롤 속도 조절
    container.scrollLeft -= walk;
  };

  const handleMouseUpOrLeave = () => {
    const container = scrollContainerRef.current;
    container.isDragging = false;
  };

  return (
    <div className="horizontal-scroll-list">
      {/* 상품 리스트가 있으면 렌더링 */}
      {products.length > 0 ? (
        <>
          <h2 className="category-title">
            <Link to={`/product/sorted/${categoryId}`}>{categoryName}</Link>
          </h2>
          <div className="category-container">
            <div
              className="scroll-container"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onScroll={handleScroll} // 스크롤 이벤트 추가
            >
              {products.map((product) => (
                <div key={product.productId} className="product-card">
                  <div className="image-container">
                    <Link to={`/product/${categoryId}/${product.productId}`}>
                      <img
                        src={imageUrls[product.productId]} // Firebase에서 가져온 이미지 URL 사용
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="overlay">
                        <span className="product-name">{product.name}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {isButtonVisible && (
              <div
                className="view-more-button"
                style={{
                  opacity: isAtEnd ? 1 : 0,
                  visibility: isAtEnd ? "visible" : "hidden",
                }}
              >
                <Link
                  to={`/product/sorted/${categoryId}`}
                  className="view-more-link"
                >
                  <span>더 보기</span>
                </Link>
              </div>
            )}
          </div>
          {/* 스크롤 끝에 다다르면 '더 보기' 버튼이 보임 */}
        </>
      ) : (
        <p></p> // 상품 리스트가 없을 때 표시
      )}
    </div>
  );
}

export default HorizontalScrollList01;
