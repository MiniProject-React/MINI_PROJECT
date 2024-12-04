import AxiosApi01 from "../api/AxiosApi01";

import {
  CartContainer,
  CartList,
  CartItem,
  CartImage,
  NoImagePlaceholder,
  CartDetails,
  ProductName,
  QuantityButtons,
  TotalPrice,
  RemoveButton,
  TotalAmountContainer,
} from "../styles/CartListFixedStyle01";

const CartListComponent = ({ cartData, onUpdateCart }) => {
  const formatPrice = (price) => {
    // 숫자를 세자리수마다 , 단위 구분 추가
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 장바구니 아이템 삭제
  const handleRemoveItem = async (cartItemId) => {
    const confirmDelete = window.confirm(
      "정말로 해당 아이템을 삭제하시겠습니까?"
    );
    if (!confirmDelete) return; // 사용자가 취소를 누르면 삭제 중단

    try {
      await AxiosApi01.deleteCart(cartItemId);
      console.log("장바구니 삭제 요청 완료", cartItemId);
      onUpdateCart(); // 장바구니 목록 리로드
    } catch (error) {
      console.log("장바구니 삭제 요청 실패", error);
    }
  };

  // 장바구니 아이템 수량 변경
  const handleQuantityChange = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      const confirmDelete = window.confirm(
        "수량이 0이 되면 아이템이 삭제됩니다. 삭제하시겠습니까?"
      );
      if (confirmDelete) {
        handleRemoveItem(cartItemId);
      }
      return;
    }

    try {
      await AxiosApi01.updateCartQuantity(cartItemId, quantity);
      console.log("장바구니 아이템 수량 업데이트 완료");
      onUpdateCart(); // 부모 컴포넌트의 데이터 갱신 호출
    } catch (error) {
      console.error("장바구니 아이템 수량 업데이트 실패", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartData.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };

  return (
    <CartContainer>
      <h3>장바구니{cartData.length > 0 ? ` (${cartData.length}개)` : ""}</h3>
      <CartList>
        {cartData.map((item) => (
          <CartItem key={item.cartItemId}>
            {/* 이미지 */}
            {item.productImageUrl ? (
              <CartImage src={item.productImageUrl} alt={item.productName} />
            ) : (
              <NoImagePlaceholder>{item.productName}</NoImagePlaceholder>
            )}

            {/* 상품 정보 및 버튼 */}
            <CartDetails>
              <ProductName>{item.productName}</ProductName>
              <QuantityButtons>
                {/* <button
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity - 1)
                  }
                >
                  -
                </button> */}
                <p>{item.quantity}개</p>
                {/* <button
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity + 1)
                  }
                >
                  +
                </button> */}
              </QuantityButtons>
              <TotalPrice>
                총 {formatPrice(item.quantity * item.productPrice)}원
              </TotalPrice>
              <RemoveButton onClick={() => handleRemoveItem(item.cartItemId)}>
                삭제
              </RemoveButton>
            </CartDetails>
          </CartItem>
        ))}
      </CartList>
      <TotalAmountContainer>
        총 {formatPrice(calculateTotalPrice())}원
      </TotalAmountContainer>
    </CartContainer>
  );
};

export default CartListComponent;
