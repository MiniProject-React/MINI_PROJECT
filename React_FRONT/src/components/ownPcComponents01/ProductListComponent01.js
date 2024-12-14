import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, CategoryTabs, ProductList, ProductCard, ProductImage, ProductDetails, QuantityControls, ActionButtons } from "../../styles/ProductListStyled01";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../api/firebase";
import AxiosApi01 from "../../api/AxiosApi01";

const ProductListComponent01 = ({ onProductSelection, onTabCompletion }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [activeTab, setActiveTab] = useState(1);

  const categoryMap = {
    1: "CPU",
    2: "GPU",
    3: "메인보드",
    4: "RAM",
    5: "SSD",
    6: "파워",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getSortedProducts = async () => {
      try {
        const response = await AxiosApi01.getSortedProducts(activeTab);
        setCategoryList(response.data);
        const initialQuantity = {};
        response.data.forEach((product) => {
          initialQuantity[product.PRODUCT_ID] = 1; // 기본 수량 1로 설정
        });
        setQuantity(initialQuantity);
        fetchImages(response.data);
      } catch (error) {
        alert("서버가 응답하지 않습니다.", error);
      }
    };

    getSortedProducts();
  }, [activeTab]);

  const fetchImages = async (products) => {
    const imagePromises = products.map(async (product) => {
      const categoryName = categoryMap[product.CATEGORY_ID];
      const imageRef = ref(storage, `images/${categoryName}/${product.NAME}.jpg`);
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

  const handleProductSelect = (product, productId) => {
    const selectedQuantity = quantity[product.PRODUCT_ID] || 1; // 수량을 가져옵니다.
  
    // 부모 컴포넌트로 선택된 상품과 수량을 전달
    onProductSelection(product, productId, selectedQuantity);
  
    // 다음 카테고리로 이동
    if (activeTab < Object.keys(categoryMap).length) {
      setActiveTab((prevTab) => prevTab + 1); // 다음 탭으로 이동
    }
  
    // 모든 카테고리를 완료한 경우 처리
    
  };

  return (
    <Container>
      <div>
        
        <CategoryTabs>
          {Object.keys(categoryMap).map((categoryId) => (
            <div
              key={categoryId}
              className={activeTab === Number(categoryId) ? "active" : ""}
              onClick={() => setActiveTab(Number(categoryId))}
            >
              {categoryMap[categoryId]}
            </div>
          ))}
        </CategoryTabs>
      </div>

      <ProductList>
        {categoryList.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          categoryList.map((product) => (
            <ProductCard key={product.PRODUCT_ID}>
              <ProductImage
                onClick={() => navigate(`/product/${product.CATEGORY_ID}/${product.PRODUCT_ID}`)}
                src={imageUrls[product.PRODUCT_ID] || product.IMAGE_URL}
                alt={product.NAME}
              />
              <ProductDetails>
                <h3>{product.NAME}</h3>
                <p>{product.PRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
              </ProductDetails>
              <QuantityControls>
                <button onClick={() => handleQuantityChange(product.PRODUCT_ID, -1)}>-</button>
                <span>{quantity[product.PRODUCT_ID] || 1}</span>
                <button onClick={() => handleQuantityChange(product.PRODUCT_ID, 1)}>+</button>
              </QuantityControls>
              <ActionButtons>
                <button onClick={() => handleProductSelect(product, product.PRODUCT_ID)}>
                  선택하기
                </button>
              </ActionButtons>
            </ProductCard>
          ))
        )}
      </ProductList>
    </Container>
  );
};

export default ProductListComponent01;
