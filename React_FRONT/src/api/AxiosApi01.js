import axios from "axios";

const MINI_DOMAIN = "http://192.168.10.25:8112";
const AxiosApi01 = {
  // 모든 상품 가져오기
  getAllProducts: async () => {
    try {
      const url = `${MINI_DOMAIN}/products`;
      const response = await axios.get(url);
      console.log("[getAllProducts] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getAllProducts] Error:", error);
      throw error;
    }
  },
  // 상품 정렬 요청
  getSortedProducts: async (categoryId, sortColumn, sortOrder) => {
    try {
      const url = `${MINI_DOMAIN}/products/sorted`;
      const response = await axios.get(url, {
        params: { categoryId, sortColumn, sortOrder },
      });
      console.log("[getSortedProducts] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getSortedProducts] Error:", error);
      throw error;
    }
  },

  // 특정 상품 조회
  getProductById: async (productId) => {
    try {
      const url = `${MINI_DOMAIN}/products/${productId}`;
      const response = await axios.get(url);
      console.log("[getProductById] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getProductById] Error:", error);
      throw error;
    }
  },
  // 특정 유저의 장바구니 목록 조회
  getCartList: async (userEmail) => {
    try {
      const url = `${MINI_DOMAIN}/carts/${userEmail}`;
      const response = await axios.get(url);
      console.log("[getCartList] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getCartList] Error:", error);
      throw error;
    }
  },

  // 장바구니에 상품 추가
  addCart: async (userEmail, productId, quantity) => {
    try {
      const url = `${MINI_DOMAIN}/carts?userEmail=${userEmail}&productId=${productId}&quantity=${quantity}`;
      const response = await axios.post(url, {
        userEmail,
        productId,
        quantity,
      });
      console.log("[addCart] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[addCart] Error:", error);
      throw error;
    }
  },

  // 장바구니 아이템 삭제
  deleteCart: async (cart_item_id) => {
    try {
      const url = `${MINI_DOMAIN}/carts/${cart_item_id}`;
      const response = await axios.delete(url);
      console.log("[deleteCart] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[deleteCart] Error:", error);
      throw error;
    }
  },
  // 장바구니 아이템 수량 업데이트
  updateCart: async (userEmail, productId, quantity) => {
    try {
      const url = `${MINI_DOMAIN}/carts/update`;
      const response = await axios.put(url, {
        userEmail,
        productId,
        quantity,
      });
      console.log("[updateCart] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[updateCart] Error:", error);
      throw error;
    }
  },
  updateCartQuantity: async (cart_item_id, quantity) => {
    try {
      const url = `${MINI_DOMAIN}/carts/updateQuantity`;
      const response = await axios.put(url, {
        cart_item_id,
        quantity,
      });
      console.log("[updateCartQuantity] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[updateCartQuantity] Error:", error);
      throw error;
    }
  },

  //카테고리 조회
  getCategoryList: async () => {
    try {
      const url = `${MINI_DOMAIN}/category`;
      const response = await axios.get(url);
      console.log("[getCatagoryList] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getCatagoryList] Error:", error);
      throw error;
    }
  },

  getOrdersList: async (email) => {
    try {
      const url = `${MINI_DOMAIN}/orders/${email}`;
      const response = await axios.get(url, email);
      console.log("[getOrderList] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getOrderList] Error:", error);
      throw error;
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      const url = `${MINI_DOMAIN}/orders/details/${orderId}`;
      const response = await axios.get(url);
      console.log("[getOrderDetails] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getOrderDetails] Error:", error);
      throw error;
    }
  },

  getCategoryId: async (productId) => {
    try {
      const url = `${MINI_DOMAIN}/products/categoryId/${productId}`;
      const response = await axios.get(url);
      console.log("[getCategoryId] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getCategoryId] Error:", error);
      throw error;
    }
  },

  getProductByCategoryId: async (categoryId) => {
    try {
      const url = `${MINI_DOMAIN}/products/category/${categoryId}`;
      const response = await axios.get(url);
      console.log("[getProductByCategoryId] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[getProductByCategoryId] Error:", error);
      throw error;
    }
  },

  // 커스텀PC 생성
  createCustomOrder: async (payload) => {
    try {
      const response = await axios.post("/api/custom-order/create", payload);
      console.log("[createCustomOrder] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[createCustomOrder] Error:", error);
      throw error;
    }
  },

  // 생성된 커스텀PC 테이블 기반으로 부품 등록
  addCustomOrderDetails: async (payload) => {
    try {
      const response = await axios.post("/api/custom-order/add", payload);
      console.log("[addCustomOrderDetails] Response:", response.data);
      return response;
    } catch (error) {
      console.error("[addCustomOrderDetails] Error:", error);
      throw error;
    }
  },
};

export default AxiosApi01;
