import { useEffect, useState } from "react";
import AxiosApi01 from "../../api/AxiosApi01";
import {
  CartContainer,
  CartTitle,
  CartItem,
  ProductImage,
  FallbackText,
  CartDetails,
  RemoveButton,
  CheckoutButton,
  EmptyCart,
  CheckoutSection,
} from "../../styles/UserCartStyle01";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

const UserCart01 = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();

  const categoryMap = {
    //카테고리id를 이름으로 전환용
    1: "CPU",
    2: "GPU",
    3: "메인보드",
    4: "RAM",
    5: "SSD",
    6: "파워",
  };

  // 페이지 로딩시 장바구니 데이터 가져오기
  useEffect(() => {
    const storedCartItems = async () => {
      setIsLoading(true);
      // 장바구니 데이터 가져오기
      try {
        const rsp = await AxiosApi01.getCartList(user.email); // 회원의 장바구니 목록 조회
        setCartItems(rsp.data); // 장바구니 목록 설정
        await fetchImages(rsp.data); // 이미지 불러오기
        console.log(rsp.data);
      } catch (error) {
        console.log("장바구니 목록 조회 실패", error);
        setError("장바구니를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchImages = async (products) => {
      const imagePromises = products.map(async (product) => {
        try {
          // 카테고리 ID 가져오기
          const categoryResponse = await AxiosApi01.getCategoryId(
            product.productId
          );
          const categoryId = categoryResponse.data;
          const categoryName = categoryMap[categoryId]; // 카테고리 ID를 이름으로 변환

          if (!categoryName) {
            console.error("카테고리 이름을 찾을 수 없음", product.productId);
            console.log(categoryResponse.data);
            return { productId: product.productId, downloadUrl: null };
          }

          if (!product.productName) {
            console.error("상품 이름을 찾을 수 없음", product.productId);
            return { productId: product.productId, downloadUrl: null };
          }

          // Firebase에서 이미지 가져오기
          const imageRef = ref(
            storage,
            `images/${categoryName}/${product.productName}.jpg`
          );

          const downloadUrl = await getDownloadURL(imageRef);
          return { productId: product.productId, downloadUrl };
        } catch (err) {
          console.error(
            `Error fetching category or image for ${product.productId}:`,
            err
          );
          return { productId: product.productId, downloadUrl: null };
        }
      });

      const results = await Promise.all(imagePromises);
      const imageMap = results.reduce((acc, cur) => {
        acc[cur.productId] = cur.downloadUrl;
        return acc;
      }, {});

      setImageUrls(imageMap);
    };

    storedCartItems();
  }, []);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await AxiosApi01.deleteCart(cartItemId); // 장바구니 아이템 삭제
      const updatedCartItems = cartItems.filter(
        (item) => item.cartItemId !== cartItemId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log("장바구니 아이템 삭제 실패", error);
    }
  };

  const formatPrice = (price) => {
    // 숫자를 세자리수마다 , 단위 구분 추가
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.productPrice) {
        // 일반 상품 가격 계산
        return total + item.quantity * item.productPrice;
      } else if (item.customPrice) {
        // 커스텀 상품 가격 계산
        return total + item.quantity * item.customPrice;
      }
      return total; // 가격 정보가 없으면 total 유지
    }, 0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  //장바구니가 비어 있을 경우 출력
  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <h3>장바구니가 비어있습니다.</h3>
          <p>원하는 상품을 추가해보세요!</p>
        </EmptyCart>
      </CartContainer>
    );
  }

  //구매버튼 클릭시 장바구니 목록을 들고 구매 페이지로 이동

  const handlePurchase = () => {
    //각 장바구니 아이템에 대해 필요한 정보 생성
    const purchasepayload = cartItems.map(item=> {
      if (item.productId) {
        //일반 제품의 경우
        return {
          customId: null,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.productPrice,
        };
      } else if (item.customId) {
        //커스텀 제품의 경우
        return {
          customId: item.customId,
          productId: null,
          productName: `pc No.${item.customId}`,
          quantity: item.quantity,
          price: item.customPrice,
        };
      }
      return null; // Id가 둘다 없는 경우 무시시
    }).filter(item => item !== null);

    //구매 페이지로 전달
    navigate("/purchase", { state: purchasepayload });
  }

  return (
    <div>
      <CartContainer>
        <CartTitle>{user.userName}님의 장바구니</CartTitle>
        {cartItems &&
  cartItems.map((item) => {
    if (item.productId) {
      // productId가 존재하는 경우 기존 방식 유지
      return (
        <CartItem key={item.cartItemId}>
          <ProductImage>
            {imageUrls[item.productId] ? (
              <img
                src={imageUrls[item.productId]}
                alt={item.productName}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <FallbackText>{item.productName}</FallbackText>
            )}
          </ProductImage>
          <CartDetails>
            <p>{item.productName}</p>
            <p>수량: {item.quantity}개</p>
            <p>가격: {formatPrice(item.productPrice)}원</p>
            <p>
              총가격: {formatPrice(item.quantity * item.productPrice)}원
            </p>
          </CartDetails>
          <RemoveButton
            onClick={() => handleRemoveFromCart(item.cartItemId)}
          >
            장바구니에서 <br /> 제거
          </RemoveButton>
        </CartItem>
      );
    } else if (item.customId) {
      // customId가 존재하는 경우 다른 형식으로 출력
      return (
        <CartItem key={item.cartItemId}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* 이름을 좌측에 크고 굵게 출력 */}
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>
              PC No.{item.customId}
            </h2>
          </div>
          <CartDetails>
            <p>수량: {item.quantity}개</p>
            <p>가격: {formatPrice(item.customPrice)}원</p>
            <p>
              총가격: {formatPrice(item.quantity * item.customPrice)}원
            </p>
          </CartDetails>
          <RemoveButton
            onClick={() => handleRemoveFromCart(item.cartItemId)}
          >
            장바구니에서 <br /> 제거
          </RemoveButton>
        </CartItem>
      );
    } else {
      return null; // productId와 customId가 모두 없는 경우 렌더링하지 않음
    }
  })}

      </CartContainer>
      <CheckoutSection>
        <h3>총가격: {formatPrice(calculateTotalPrice())}원</h3>
        <CheckoutButton onClick={handlePurchase}>구매하기</CheckoutButton>
      </CheckoutSection>
    </div>
  );
};

export default UserCart01;
