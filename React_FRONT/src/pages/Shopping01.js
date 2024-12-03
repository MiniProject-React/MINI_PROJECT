import ProductSortComponent01 from "../components/ProductSortComponent01";
import { useState } from "react";

const Shopping = () => {
  const [categoryId, setCategoryId] = useState("1");
  const [sortColumn, setSortColumn] = useState("price");
  const [sortOrder, setSortOrder] = useState("d"); // "d" 는 내림차순, "a" 는 오름차순

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

  const handleSubmit = () => {
    console.log("Category:", categoryId);
    console.log("Sort Column:", sortColumn);
    console.log("Sort Order:", sortOrder);
  };
  return (
    <div>
      <h1>상품 정렬</h1>
      <div>
        <label> 카테고리 : </label>
        <select onChange={handleCategoryChange} value={categoryId}>
          <option value="1">CPU</option>
          <option value="2">그래픽카드</option>
          <option value="3">메인보드</option>
          <option value="4">RAM</option>
          <option value="5">SSD</option>
          <option value="6">파워</option>
        </select>
      </div>

      <div>
        <label>정렬 기준: </label>
        <select onChange={handleSortColumnChange} value={sortColumn}>
          <option value="name">이름</option>
          <option value="price">가격</option>
          <option value="rating">평점</option>
          <option value="stock">개수</option>
          <option value="review_count">리뷰 수</option>
        </select>
      </div>

      <div>
        <label>정렬 순서: </label>
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>

      <button onClick={handleSubmit}>로그 확인</button>
      <ProductSortComponent01
        categoryId={categoryId}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSelectProduct={(product) => console.log("Selected product:", product)}
      />
    </div>
  );
};

export default Shopping;
