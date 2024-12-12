import React, { useState, useEffect } from "react";
import AxiosApi01 from "../api/AxiosApi01";
import { useNavigate } from "react-router-dom";
import {
  ProductSort,
  ProductSortList,
  ProductCard,
  ProductImage,
  ProductDetails,
  QuantityControls,
  AddToCartButton,
  PlaceholderImage,
  ActionButtons,
} from "../styles/ProductSortStyle01";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, listAll } from "../api/firebase";

const ProductSortComponent = ({
  categoryId,
  sortColumn,
  sortOrder,
  onSelectProduct,
}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [imageError, setImageError] = useState({}); // 이미지를 불러오지 못한 상태를 저장

  const categoryMap = {
    //카테고리id를 이름으로 전환용
    1: "CPU",
    2: "GPU",
    3: "메인보드",
    4: "RAM",
    5: "SSD",
    6: "파워",
  };

  const navigate = useNavigate();
  const formatPrice = (price) => {
    // 숫자를 세자리수마다 , 단위 구분 추가
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const getSortedProducts = async () => {
      try {
        const rsp = await AxiosApi01.getSortedProducts(
          categoryId,
          sortColumn,
          sortOrder
        );
        setCategoryList(rsp.data);

        const initialQuantity = {};
        rsp.data.forEach((product) => {
          initialQuantity[product.PRODUCT_ID] = 1;
        });
        setQuantity(initialQuantity);

        fetchImages(rsp.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.", e);
      }
    };
    getSortedProducts();
  }, [categoryId, sortColumn, sortOrder]);

  const fetchImages = async (products) => {
    const imagePromises = products.map(async (product) => {
      const categoryName = categoryMap[product.CATEGORY_ID];
      const imageRef = ref(
        storage,
        `images/${categoryName}/${product.NAME}.jpg`
      );
      try {
        const downloadUrl = await getDownloadURL(imageRef);
        return { productId: product.PRODUCT_ID, downloadUrl };
      } catch (err) {
        console.error(`Error fetching image for ${product.NAME}:`, err);
        return { productId: product.PRODUCT_ID, downloadUrl: null };
      }
    });

    const imageResults = await Promise.all(imagePromises);
    const imageMap = imageResults.reduce((acc, cur) => {
      acc[cur.productId] = cur.downloadUrl;
      return acc;
    }, {});
    setImageUrls(imageMap);
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + delta),
    }));
  };

  // 이미지 로드 실패 시 상태 업데이트
  const handleImageError = (productId) => {
    setImageError((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }));
  };

  if (categoryList.length === 0) {
    return <p>상품이 없습니다.</p>;
  }

  return (
    <ProductSort>
      {categoryList.map((product) => (
        <ProductCard key={product.PRODUCT_ID}>
          <ProductImage
            onClick={() =>
              navigate(`/product/${product.CATEGORY_ID}/${product.PRODUCT_ID}`)
            }
            src={imageUrls[product.PRODUCT_ID] || product.IMAGE_URL}
            alt={product.NAME}
            onError={() => handleImageError(product.PRODUCT_ID)} // 이미지 로드 실패 시 호출
          />

          <ProductDetails
            onClick={() =>
              navigate(`/product/${product.CATEGORY_ID}/${product.PRODUCT_ID}`)
            }
          >
            <div className="left">
              <h3>{product.NAME}</h3>
            </div>
            <div className="right">
              <p>{formatPrice(product.PRICE)}원</p>
              <p>재고 : {product.STOCK}개</p>
              {!product.RATING ? (
                <p>평균 평점 : 0(0)</p>
              ) : (
                <p>
                  평균 평점 : {product.RATING}({product.RATING_COUNT})
                </p>
              )}
            </div>
          </ProductDetails>
          <QuantityControls>
            <button
              onClick={() => handleQuantityChange(product.PRODUCT_ID, -1)}
            >
              -
            </button>
            <span>{quantity[product.PRODUCT_ID] || 1}</span>
            <button onClick={() => handleQuantityChange(product.PRODUCT_ID, 1)}>
              +
            </button>
          </QuantityControls>
          <ActionButtons>
            <button
              className="cart-btn"
              onClick={(e) => {
                onSelectProduct({
                  ...product,
                  quantity: quantity[product.PRODUCT_ID],
                });
              }}
            >
              장바구니
            </button>
            <button
              className="buy-btn"
              onClick={(e) => {
                alert("구매하기");
              }}
            >
              구매하기
            </button>
          </ActionButtons>
        </ProductCard>
      ))}
    </ProductSort>
  );
};

export default ProductSortComponent;
