import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../css/ProductDetail4.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebase";
import { UserContext } from "../api/provider/UserContextProvider";
import AxiosApi01 from "../api/AxiosApi01";

const ProductDetail4 = () => {
  const { category, productId } = useParams(); // URL 파라미터 추출
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [imageUrl, setImageUrl] = useState(""); // Firebase 이미지 URL 저장
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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
    fetch(`http://192.168.10.25:8112/products/${productId}`)
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

  // 장바구니에 담기
  const addProductToCart = async (productId) => {
    // 장바구니에 상품을 추가하는 코드
    if (!user.isLogin) {
      alert("로그인 후 사용할 수 있습니다.");
      navigate("/login");
    }
    try {
      await AxiosApi01.addCart(user.email, productId, quantity);
      console.log("상품 추가 요청 성공");
    } catch (error) {
      console.error("상품 추가 요청 실패", error);
    }
  };

  const handlePurchaseButtonClick = () => {
    const purchasePayload = [
      {
        customId: null,
        productId: productId,
        productName: product.name,
        quantity: quantity,
        price: product.price,
      },
    ];
    if (!user.isLogin) {
      alert("로그인 후 사용할 수 있습니다.");
      navigate("/login");
    }
    if (user.isLogin) {
      navigate("/purchase", { state: purchasePayload });
    }
  };
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
            <p>{`${product.price.toLocaleString()}원`}</p>
            <br />
            <br />

            {/* 수량 선택 버튼 */}
            <div className="quantity-controls">
              <button
                className="quantity-decrease"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-increase"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="product-actions">
              {/* 장바구니 버튼 */}
              <button
                className="add-to-cart"
                onClick={() => addProductToCart(productId)}
              >
                장바구니에 담기
              </button>

              {/* 바로 구매 버튼 */}
              <button
                className="buy-now"
                onClick={() => {
                  handlePurchaseButtonClick();
                }}
              >
                구매하기
              </button>
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
