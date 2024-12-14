import { useContext, useEffect, useState } from "react";
import AxiosApi from "../../../api/AxiosApi3";
import { PageNavigate } from "../../../api/Pagination/PageNavigate";
import { ProductsSearchContext } from "../../../api/provider/ProductsSearchContextProvider";
import AxiosApi3 from "../../../api/AxiosApi3";
import { USERID } from "./AddOrderModal";
import { useNavigate, useParams } from "react-router-dom";
const AdminOrderProducts = () => {
  const { searchKeyword } = useContext(ProductsSearchContext);
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [price, setPrice] = useState([]);
  const [total, setTotal] = useState("");
  const userId = useContext(USERID);
  const [order_id, setOrder_id] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("총합:", total); // total이 변경될 때마다 실행
    console.log("주문 모달창에서 user_id 확인 ", userId);
  }, [total]);

  useEffect(() => {
    ProductList();
  }, [searchKeyword]);

  useEffect(() => {
    GetBulk();
    console.log(quantity);
    console.log(price);
  }, [selectedProducts]);

  // orders테이블 컬럼 order_id : 트리거 , total_price : 계산,
  //order_date : sysdate, status : 초기값 = 결제 대기, user_id = ?
  const Order = async () => {
    console.log("order 함수내에서 값 확인 total : ", total);
    console.log("order 함수내에서 값 확인 userId : ", userId);

    try {
      // 1. 서버로부터 findOrderId 가져오기
      const rsp = await AxiosApi3.orderorder(total, userId);
      const findOrderId = rsp.data.findOrderId; // 응답 데이터
      console.log("order order 테이블", findOrderId);

      // 2. order_id와 selectedProducts 업데이트
      if (findOrderId > 0) {
        setOrder_id(findOrderId);

        // selectedProducts 업데이트
        const updatedProducts = selectedProducts.map((item) => ({
          ...item,
          order_id: findOrderId,
        }));
        setSelectedProducts(updatedProducts);

        // 3. OrderProduct 호출
        await OrderProduct(updatedProducts); // 업데이트된 products 전달
      }
    } catch (error) {
      console.error("Order 함수 실행 중 오류 발생: ", error);
    }
  };

  const OrderProduct = async (selectedProducts) => {
    try {
      console.log("OrderProduct 호출됨:", selectedProducts);
      const rsp = await AxiosApi3.order_product(selectedProducts);
      console.log("OrderProduct 응답: ", rsp.data);
      if (rsp.data === true) {
        alert("주문 추가에 성공하였습니다.");
      }
    } catch (error) {
      console.error("OrderProduct 실행 중 오류 발생: ", error);
    }
  };

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

  // 체크박스 값 변경 처리
  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.some(
        // some은 배열의 하나 이상의 요소가 조건을 만족하는지 확인하고, 조건을 만족하면 true를 반환합니다.
        (item) => item.product_id === product.product_id
      );

      if (isSelected) {
        // 이미 선택된 상품이면 제거
        return prevSelected.filter(
          (item) => item.product_id !== product.product_id // 현재들어온 product_id값과 같지 않은 것만 포함
        );
      } else {
        // 선택되지 않은 상품이면 추가, 기본 quantity = 1
        return [...prevSelected, { ...product, quantity: 1 }];
      }
    });
  };

  // quantity 변경 처리
  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  // 가격 총합 계산
  const GetBulk = () => {
    const quantities = selectedProducts.map((product) => product.quantity);
    const prices = selectedProducts.map((product) => product.price);
    setQuantity(quantities);
    setPrice(prices);

    // 총합 계산
    const calculatedTotal = selectedProducts.reduce((sum, product) => {
      return sum + product.quantity * product.price;
    }, 0);
    setTotal(calculatedTotal); // 총합 상태 업데이트
  };

  return (
    <>
      <div className="container mt-4">
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "5%" }}>
                체크
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
                      className="form-check-input"
                      checked={selectedProducts.some(
                        (item) => item.product_id === product.product_id
                      )}
                      onChange={() => handleCheckboxChange(product)}
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
      <br /> <br /> <br />
      <div>
        <h4>선택된 상품</h4>
        <div>
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product) => (
              <>
                <div
                  key={product.product_id}
                  className="d-flex align-items-center"
                >
                  <span>
                    <strong>{product.category}:</strong> {product.product} (
                    {product.price}원)
                  </span>
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    className="form-control ml-2"
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.product_id,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </>
            ))
          ) : (
            <div>
              <strong>상품을 선택해주세요</strong>
            </div>
          )}
          <div>
            <strong>총 합계 : {total}</strong>
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={() => Order()}>
          주문 하기
        </button>
      </div>
    </>
  );
};

export default AdminOrderProducts;
