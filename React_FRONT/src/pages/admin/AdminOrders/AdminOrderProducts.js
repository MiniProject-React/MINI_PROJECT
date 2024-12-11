import { useContext, useEffect, useState } from "react";
import AxiosApi from "../../../api/AxiosApi3";
import { PageNavigate } from "../../../api/Pagination/PageNavigate";
import { ProductsSearchContext } from "../../../api/provider/ProductsSearchContextProvider";
import { CheckBox } from "@material-ui/icons";

const AdminOrderProducts = () => {
  const { searchKeyword } = useContext(ProductsSearchContext);
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    ProductList();
  }, [searchKeyword]);

  const ProductList = async (cpage) => {
    cpage = cpage || 1;
    const params = {
      ...searchKeyword,
      currentPage: cpage,
      pageSize: 5,
    };

    const rsp = await AxiosApi.orderProducts(params);
    setProductList(rsp.data.order_products);
    setCurrentPage(cpage);
    setTotalCnt(rsp.data.totalCount);
  };

  return (
    <>
      <div className="container mt-4">
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "5%" }}>
                {/* 체크박스 열 */}
              </th>
              <th scope="col">카테고리</th>
              <th scope="col">상품 ID</th>
              <th scope="col">상품명</th>
              <th scope="col">가격</th>
            </tr>
          </thead>
          <tbody>
            {productList && productList.length > 0 ? (
              productList.map((product) => (
                <tr key={product.product_id}>
                  <td>
                    <input
                      type="checkbox"
                      value={product.product_id}
                      className="form-check-input"
                    />
                  </td>
                  <td>{product.category}</td>
                  <td>{product.product_id}</td>
                  <td>{product.product}</td>
                  <td>{product.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <PageNavigate
          totalItemsCount={totalCnt}
          onChange={ProductList}
          itemsCountPerPage={5}
          activePage={currentPage}
        />
      </div>
    </>
  );
};
export default AdminOrderProducts;
