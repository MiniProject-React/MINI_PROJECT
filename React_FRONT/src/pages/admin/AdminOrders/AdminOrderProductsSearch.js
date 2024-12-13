import AxiosApi from "../../../api/AxiosApi3";
import { ProductsSearchContext } from "../../../api/provider/ProductsSearchContextProvider";
import { useContext, useEffect, useState } from "react";

export const AdminOrderProductsSearch = () => {
  const { setSearchKeyword } = useContext(ProductsSearchContext);
  const [category, setCategory] = useState("");
  const [input, setInput] = useState({
    searchKeyword: "",
    searchCondition: "name",
    searchCategory: -1,
  });

  useEffect(() => {
    selectCategory();
  }, []);
  useEffect(() => {
    handlerSearch();
  }, [input]);

  // 검색 기능
  const handlerSearch = () => {
    setSearchKeyword(input);
  };

  const selectCategory = async () => {
    const rsp = await AxiosApi.categoryList();
    setCategory(rsp.data.category);
  };
  // 권한 검색 변경 확인
  const checkCategoryChange = (e) => {
    const newCategory = parseInt(e.currentTarget.value, 10); // 선택한 값을 숫자 타입으로 변환
    setInput({ ...input, searchCategory: newCategory }); // 상태 업데이트
    handlerSearch(newCategory); // 새 값을 전달
  };
  return (
    <>
      <div className="d-flex flex-row mb-3">
        <div className="me-3">
          <select className="form-select" onChange={checkCategoryChange}>
            <option value={-1}>전체</option>
            {category && category.length > 0 ? (
              category.map((a, i) => (
                <option key={i} value={a.category_id}>
                  {a.name}
                </option>
              ))
            ) : (
              <option value="">데이터 없음</option>
            )}
          </select>
        </div>
        <div className="me-3">
          <select
            className="form-select"
            onChange={(e) =>
              setInput({ ...input, searchCondition: e.currentTarget.value })
            }
          >
            <option value="name">상품명</option>
            <option value="price">가격</option>
          </select>
        </div>
        <div className="me-3">
          <input
            className="form-control"
            type="text"
            onChange={(e) =>
              setInput({ ...input, searchKeyword: e.currentTarget.value })
            }
          />
        </div>
      </div>
    </>
  );
};