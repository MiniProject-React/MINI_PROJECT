import ProductSortComponent from "../components/ProductSortComponent01";
import { useEffect, useState } from "react";
import AxiosApi01 from "../api/AxiosApi01";
import CartListComponent from "../components/CartListComponent01";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;
const ProductSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0; /* 사이드바와 상품정렬 컴포넌트 사이의 간격 */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// const CartSection = styled.div`
//   flex: 1; /* 장바구니 섹션 */
//   padding: 20px;
// `;

const Sidebar = styled.div`
  max-width: 900px; /* 기존 사이드바 너비 유지 */
  width: 100%;
  background-color: #f5f5f5; /* 밝은 배경 */
  border: 1px solid #e0e0e0; /* 구분을 위한 테두리 */
  border-bottom: none;
  border-radius: 8px 8px 0 0; /* 모서리 둥글게 */
  padding: 10px 20px; /* 상하 10px, 좌우 20px 패딩 */
  display: flex;
  align-items: center; /* 중앙 정렬 */
  justify-content: space-between; /* 좌우로 배치 */
  box-sizing: border-box;
  margin: 0 auto; /* 가운데 정렬 */
`;

const SidebarTitle = styled.h1`
  font-size: 18px; /* 볼드로 크게 */
  font-weight: bold;
  color: #333; /* 어두운 색상 */
  margin: 0; /* 제목과 다른 요소 간격 제거 */
`;

const SortOptionsContainer = styled.div`
  display: flex; /* 가로로 배치 */
  gap: 20px; /* 옵션 간 간격 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const SortOption = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 (라벨 위, 셀렉트 아래) */
  align-items: center; /* 가운데 정렬 */
  gap: 5px;

  label {
    font-size: 12px;
    font-weight: bold;
    color: #555;
  }

  select {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      border-color: #999; /* 호버 시 테두리 색 변경 */
    }
    &:focus {
      outline: none;
      border-color: #007bff; /* 포커스 시 강조 색상 */
    }
  }
`;

const Shopping = () => {
  const [categoryId, setCategoryId] = useState("1");
  const [sortColumn, setSortColumn] = useState("price");
  const [sortOrder, setSortOrder] = useState("d"); // "d" 는 내림차순, "a" 는 오름차순
  const [cartData, setCartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const { urlCategoryId } = useParams();

  // 주소 데이터 가져오기
  useEffect(() => {
    if (urlCategoryId) {
      setCategoryId(urlCategoryId);
    }
  }, [urlCategoryId]);

  //백엔드에서 카테고리 데이터를 가져오는 함수
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const rsp = await AxiosApi01.getCategoryList(); // 카테고리 목록 조회
        setCategoryData(rsp.data); // 카테고리 목록 설정
      } catch (error) {
        console.log("카테고리 목록 조회 실패", error);
      }
    };
    fetchCategoryData();
  }, []);

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
      alert("장바구니에 추가 성공");
      getCartData(); // 장바구니 목록 갱신
    } catch (error) {
      console.log("상품 추가 요청 실패", error);
    }
  };

  //발류값 지정
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
          <SidebarTitle>상품 리스트</SidebarTitle>
          <SortOptionsContainer>
            <SortOption>
              <label>카테고리</label>
              <select onChange={handleCategoryChange} value={categoryId}>
                {categoryData &&
                  categoryData.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </SortOption>
            <SortOption>
              <label>정렬 기준</label>
              <select onChange={handleSortColumnChange} value={sortColumn}>
                <option value="name">이름</option>
                <option value="price">가격</option>
                <option value="rating">평점</option>
                <option value="stock">재고</option>
              </select>
            </SortOption>
            <SortOption>
              <label>정렬 순서</label>
              <select onChange={handleSortOrderChange} value={sortOrder}>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </SortOption>
          </SortOptionsContainer>
        </Sidebar>
        <ProductSortComponent
          categoryId={categoryId}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSelectProduct={addProductToCart}
        />
      </ProductSection>
      {/* <CartSection>
        <CartListComponent cartData={cartData} onUpdateCart={getCartData} />
      </CartSection> */}
    </Container>
  );
};

export default Shopping;
