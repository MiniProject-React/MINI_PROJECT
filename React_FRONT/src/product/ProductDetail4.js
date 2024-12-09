import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProductDetail4.css';

const ProductDetail4 = () => {
    const { category, productId } = useParams(); // URL 파라미터 추출

    return (
        <div className="product-detail">
            {/* 제품 이미지와 정보가 포함된 컨테이너 */}
            <div className="product-info-container-wrapper">
                <div className="product-detail-container">
                    {/* 이미지 영역 */}
                    <div className="product-image-container">
                        <div className="product-image-placeholder">
                            {/* 실제 이미지가 있으면 여기에 넣을 수 있습니다 */}
                            {/* <img src={`product-${productId}.jpg`} alt={`Product ${productId}`} /> */}
                        </div>
                    </div>

                    {/* 상품 정보 영역 */}
                    <div className="product-info-container">
                        <p><strong>Product Name:</strong> Product {productId} Title</p>
                        <p><strong>Price:</strong> {`$${productId * 10}`}</p>
                        <br/><br/>

                        <div className="product-actions">
                            <a href="/cart" className="add-to-cart">장바구니에 담기</a>
                            <a href="/buy" className="buy-now">구매하기</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 설명 컨테이너 */}
            <div className="product-description">
                <h2>Detailed Description</h2>
                <p>
                    Here you can provide more detailed information about the product.
                    You can include specifications, features, and any other relevant information.
                </p>
            </div>
        </div>
    );
};

export default ProductDetail4;
