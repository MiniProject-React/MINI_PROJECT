import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetail4.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebase";

const ProductDetail4 = () => {
  const { category, productId } = useParams(); // URL 파라미터 추출
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [imageUrl, setImageUrl] = useState(""); // Firebase 이미지 URL 저장

  const categoryMap = {
    // 카테고리 ID를 이름으로 전환용
    1: "CPU",
    2: "GPU",
    3: "메인보드",
    4: "RAM",
    5: "SSD",
    6: "파워",
  };

  // 상품 정보를 가져오는 함수
  useEffect(() => {
    // API를 사용하여 상품 정보를 가져오는 코드
    fetch(`http://localhost:8112/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct({
          ...data,
          categoryName: categoryMap[data.categoryId], // 카테고리 이름 매핑
        });

        // firebase storage에서 이미지 가져오기
        const imageRef = ref(
          storage,
          `images/${categoryMap[data.categoryId]}/${data.name}.jpg` // Firebase 이미지 경로
        );
        console.log(imageRef);
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        setImageUrl(url);
        setLoading(false);
      }) // 로딩 완료
      .catch((error) => console.error("Error fetching product:", error));
    console.log(product);
  }, [productId]);

  // 로딩 중일 때 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  // product가 null이면 오류 방지
  if (!product) {
    return <div>Error: Product not found.</div>;
  }

  return (
    <div className="product-detail">
      {/* 제품 이미지와 정보가 포함된 컨테이너 */}
      <div className="product-info-container-wrapper">
        <div className="product-detail-container">
          {/* 이미지 영역 */}
          <div className="product-image-container">
            <div className="product-image-placeholder">
              {/* 실제 이미지가 있으면 여기에 넣을 수 있습니다 */}
              {imageUrl ? (
                <img src={imageUrl} alt={`Product ${productId}`} />
              ) : (
                <div>Loading Image...</div>
              )}
            </div>
          </div>

          {/* 상품 정보 영역 */}
          <div className="product-info-container">
            <p>
              <strong>{product.name}</strong>
            </p>
            <p>
              <strong>가격:</strong> {`${product.price.toLocaleString()}원`}
            </p>
            <br />
            <br />

            <div className="product-actions">
              <a href="/cart" className="add-to-cart">
                장바구니에 담기
              </a>
              <a href="/buy" className="buy-now">
                구매하기
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 설명 컨테이너 */}
      <div className="product-description">
        <h2>상세 설명</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail4;
