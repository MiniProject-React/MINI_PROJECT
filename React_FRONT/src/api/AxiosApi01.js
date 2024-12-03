import axios from "axios";

const MINI_DOMAIN = "http://localhost:8112";
const AxiosApi01 = {
  getSortedProducts: async (categoryId, sortColumn, sortOrder) => {
    const url = `${MINI_DOMAIN}/products/sorted?categoryId=${categoryId}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
    return await axios.get(url);
  },

  getProductById: async (productId) => {
    const url = `${MINI_DOMAIN}/products/${productId}`;
    return await axios.get(url);
  },
};
export default AxiosApi01;
