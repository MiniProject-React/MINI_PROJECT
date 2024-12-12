import { useState, createContext } from "react";
import { AdminOrderProductsSearch } from "../../pages/admin/AdminOrders/AdminOrderProductsSearch";
import AdminOrderProducts from "../../pages/admin/AdminOrders/AdminOrderProducts";

const defaultValue = {
  searchKeyword: {},
  setSearchKeyword: () => {},
  selectCategory: {},
  setSelectCategory: () => {},
  selectColumn: {},
  setSelectColumn: () => {},
};
export const ProductsSearchContext = createContext(defaultValue);

export const ProductsContextProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState({});

  return (
    <ProductsSearchContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </ProductsSearchContext.Provider>
  );
};

export const AdminOrderProductsMap = () => {
  return (
    <>
      <ProductsContextProvider>
        <h2>상품 정보</h2>
        <AdminOrderProductsSearch></AdminOrderProductsSearch>
        <AdminOrderProducts></AdminOrderProducts>
      </ProductsContextProvider>
    </>
  );
};
