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

const UserCart01 = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const user = {
  //   // 임시 회원정보
  //   user_id: "1",
  //   username: "testuser",
  //   password: "abc123",
  //   email: "testuser@example.com",
  //   address: "123 Test Street, Test City",
  //   phone_number: "010-1234-5678",
  //   role: "USER",
  // };

  // 페이지 로딩시 장바구니 데이터 가져오기
  useEffect(() => {
    const storedCartItems = async () => {
      setIsLoading(true);
      // 장바구니 데이터 가져오기
      try {
        const rsp = await AxiosApi01.getCartList(user.user_id); // 회원의 장바구니 목록 조회
        setCartItems(rsp.data); // 장바구니 목록 설정
      } catch (error) {
        console.log("장바구니 목록 조회 실패", error);
        setError("장바구니를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
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
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
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

  return (
    <div>
      <CartContainer>
        <CartTitle>{user.username}님의 장바구니</CartTitle>
        {cartItems &&
          cartItems.map((item) => (
            <CartItem key={item.cartItemId}>
              <ProductImage>
                {item.productImageUrl ? (
                  <img
                    src={item.productImageUrl}
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
                <p> {item.productName}</p>
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
          ))}
      </CartContainer>
      <CheckoutSection>
        <h3>총가격: {formatPrice(calculateTotalPrice())}원</h3>
        <CheckoutButton>구매하기</CheckoutButton>
      </CheckoutSection>
    </div>
  );
};

export default UserCart01;
