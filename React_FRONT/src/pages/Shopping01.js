import ProductSortComponent01 from "../components/ProductSortComponent01";
import { useEffect, useState } from "react";
import AxiosApi01 from "../api/AxiosApi01";
import CartListComponent from "../components/CartListComponent01";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f9f9f9;
  overflow-x: hidden; /* 수평 스크롤 방지 */
`;

const ProductSection = styled.div`
  flex: 3; /* 상품 정렬 섹션 */
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const CartSection = styled.div`
  flex: 1; /* 장바구니 섹션 */
  padding: 20px;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 20px; /* 상단에서 떨어진 거리 */
  align-self: flex-start; /* 부모 요소 기준으로 정렬 */
  width: 200px; /* 적절한 너비 */
  max-width: 20%; /* 화면 비율에 따른 제한 */
  background-color: #fff;
  border-right: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SortOption = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Shopping = () => {
  const [categoryId, setCategoryId] = useState("1");
  const [sortColumn, setSortColumn] = useState("price");
  const [sortOrder, setSortOrder] = useState("d"); // "d" 는 내림차순, "a" 는 오름차순
  const [cartData, setCartData] = useState([]);

  const user = {
    // 임시 회원정보
    user_id: "1",
    username: "testuser",
    password: "abc123",
    email: "testuser@example.com",
    address: "123 Test Street, Test City",
    phone_number: "010-1234-5678",
    role: "USER",
  };

  // 장바구니 데이터 가져오기
  const getCartData = async () => {
    try {
      const rsp = await AxiosApi01.getCartList(user.user_id); // 회원의 장바구니 목록 조회
      setCartData(rsp.data); // 장바구니 목록 설정
    } catch (error) {
      console.log("장바구니 목록 조회 실패", error);
    }
  };

  useEffect(() => {
    getCartData(); // 초기 장바구니 데이터 로드
  }, []);

  // 상품 추가 요청
  const addProductToCart = async (product) => {
    try {
      await AxiosApi01.addCart(
        user.user_id,
        product.PRODUCT_ID,
        product.quantity
      ); // 상품 추가 요청
      console.log("상품 추가 요청 성공");
      getCartData(); // 장바구니 목록 갱신
    } catch (error) {
      console.log("상품 추가 요청 실패", error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSortColumnChange = (event) => {
    setSortColumn(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // 버튼 클릭시 로그 값 출력

  // const handleSubmit = () => {
  //   console.log("Category:", categoryId);
  //   console.log("Sort Column:", sortColumn);
  //   console.log("Sort Order:", sortOrder);
  // };
  return (
    <Container>
      <ProductSection>
        <Sidebar>
          <h1>상품 정렬</h1>
          <SortOption>
            <label>카테고리</label>
            <select onChange={handleCategoryChange} value={categoryId}>
              <option value="1">CPU</option>
              <option value="2">그래픽카드</option>
              <option value="3">메인보드</option>
              <option value="4">RAM</option>
              <option value="5">SSD</option>
              <option value="6">파워</option>
            </select>
          </SortOption>
          <SortOption>
            <label>정렬 기준</label>
            <select onChange={handleSortColumnChange} value={sortColumn}>
              <option value="name">이름</option>
              <option value="price">가격</option>
              <option value="rating">평점</option>
              <option value="stock">개수</option>
              <option value="review_count">리뷰 수</option>
            </select>
          </SortOption>
          <SortOption>
            <label>정렬 순서</label>
            <select onChange={handleSortOrderChange} value={sortOrder}>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </SortOption>
        </Sidebar>

        <ProductSortComponent01
          categoryId={categoryId}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSelectProduct={addProductToCart}
        />
      </ProductSection>
      <CartSection>
        <CartListComponent cartData={cartData} onUpdateCart={getCartData} />
      </CartSection>
    </Container>
  );
};

export default Shopping;
