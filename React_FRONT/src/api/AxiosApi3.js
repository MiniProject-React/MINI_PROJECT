import axios from "axios";
const KH_DOMAIN = "http://localhost:8112";

const AxiosApi3 = {
  // 로그인
  login: async (email, pw) => {
    console.log("이메일 : ", email);
    console.log("패스워드 : ", pw);
    const login = {
      email: email,
      password: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  // 이메일 중복 검사
  regCheck: async (email) => {
    return await axios.get(KH_DOMAIN + `/auth/exists/${email}`);
  },
  // 회원 가입
  signup: async (email, pwd, name, address, ph) => {
    const member = {
      email: email,
      password: pwd,
      username: name,
      address: address,
      phone_number: ph,
    };
    return await axios.post(KH_DOMAIN + `/auth/signup`, member);
  },
  // 권한 확인 (회원 등급 확인)
  roleCheck: async (email, password) => {
    console.log("이메일 : ", email);
    console.log("패스워드 : ", password);

    const params = {
      email: email,
      password: password,
    };

    return await axios.get(KH_DOMAIN + "/auth/roleCheck", { params });
  },
  // 카테고리 리스트 출력
  categoryList: async () => {
    return await axios.get(KH_DOMAIN + "/products/category");
  },

  // 상품 등록
  productSave: async (category, productName, price, stock, description) => {
    const product = {
      category_id: category,
      name: productName,
      price: price,
      stock: stock,
      description: description,
    };
    return await axios.post(KH_DOMAIN + "/products/save", product);
  },

  // 상품 이름 중복 검사
  productNameCheck: async (productName) => {
    const product = { name: productName };
    return await axios.post(KH_DOMAIN + "/products/product_name", product);
  },

  // 카테고리 이름 가져오기
  getCatagoryName: async (category) => {
    return await axios.get(KH_DOMAIN + "/products/category_name", {
      params: { category_id: category }, // 쿼리 파라미터로 전달
    });
  },

  // 상품 삭제 하기
  deleteProduct: async (productId) => {
    const param = { product_id: productId };
    return await axios.post(KH_DOMAIN + "/products/delete_product", param);
  },

  //  회원 리스트 조회
  userList: async (params) => {
    return await axios.get(KH_DOMAIN + "/users/list", {
      params: params, // params 객체로 전달받은 파라미터를 그대로 사용
    });
  },

  // 권한 조회
  roleSearch: async () => {
    return await axios.get(KH_DOMAIN + "/users/role");
  },

  // 유저 삭제
  userDelete: async (user_id) => {
    const params = {
      user_id: user_id,
    };
    return await axios.post(KH_DOMAIN + "/users/delete", params);
  },

  // 상세 회원 정보 조회
  detailUserInfo: async (user_id) => {
    const params = {
      user_id: user_id,
    };
    return await axios.get(KH_DOMAIN + "/users/detailUser", { params });
  },

  // 회원 정보 수정
  userupdate: async (inputEmail, inputPw, inputName, inputAddress, ph) => {
    const params = {
      email: inputEmail,
      password: inputPw,
      username: inputName,
      address: inputAddress,
      phone_number: ph,
    };
    return await axios.post(KH_DOMAIN + "/users/userupdate", params);
  },

  // 주문 목록 조회
  orderList: async (user_id) => {
    return await axios.get(KH_DOMAIN + `/order/orderList/${user_id}`);
  },

  // 커스텀 PC 주문 목록 조회
  customOrderList: async (user_id) => {
    return await axios.get(KH_DOMAIN + `/order/customOrderList/${user_id}`);
  },

  // 제품 리스트 출력
  productList: async () => {
    return await axios.get(KH_DOMAIN + "/products/list");
  },
};

export default AxiosApi3;
