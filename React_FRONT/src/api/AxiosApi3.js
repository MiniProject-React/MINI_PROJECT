import axios from "axios";
const KH_DOMAIN = "http://192.168.10.25:8112";

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
    console.log("이메일 api: ", email);
    console.log("패스워드 api: ", password);
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

  // 주문 목록 상세 조회
  orderList: async (user_id) => {
    return await axios.get(KH_DOMAIN + `/order/orderList/${user_id}`);
  },

  // 커스텀 PC 주문 목록 상세 조회
  customOrderList: async (user_id) => {
    return await axios.get(KH_DOMAIN + `/order/customOrderList/${user_id}`);
  },

  // 제품 리스트 출력
  productList: async () => {
    return await axios.get(KH_DOMAIN + "/products/list");
  },
  // 주문 목록
  order: async (user_id) => {
    return await axios.get(KH_DOMAIN + `/order/list/${user_id}`);
  },
  // 커스텀 목록
  custom: async (user_id) => {
    return await axios.get(KH_DOMAIN + `/order/custom/${user_id}`);
  },
  // order product
  orderProducts: async (params) => {
    return await axios.get(KH_DOMAIN + `/products/order_products`, {
      params: params, // 파라미터를 올바르게 전달
    });
  },
  orderorder: async (total, user_id) => {
    console.log("API 토탈 확인", total);
    console.log("API 유저 확인", user_id);
    const params = {
      total_price: total,
      user_id: user_id.user_id,
    };
    return await axios.post(KH_DOMAIN + "/order/order", params, {
      headers: {
        "Content-Type": "application/json", // 서버가 JSON 형식의 데이터를 받을 경우 설정
      },
    });
  },
  // 배열이 입력 되어야 함
  order_product: async (selectProduct) => {
    return await axios.post(KH_DOMAIN + "/order/orderdetail", selectProduct);
  },

  // 아이디 비밀번호 찾기 회원 확인
  validUserInfo: async (name, phone) => {
    const params = {
      username: name,
      phone_number: phone,
    };
    return await axios.get(KH_DOMAIN + "/auth/name_and_phone", { params });
  },

  // 카카오 SMS 인증 번호 발송
  sendingSMS: async (phone) => {
    console.log("sendingSMS", phone);
    const params = { phone_number: phone };
    return await axios.post(KH_DOMAIN + "/send-one", params, {
      headers: { "Content-Type": "application/json" }, // JSON 형식 명시
    });
  },

  varify_code: async (inputCode) => {
    const params = { inputCode }; // inputCode를 객체로 만들어서 전달
    return await axios.post(KH_DOMAIN + "/verify-code", params, {
      headers: { "Content-Type": "application/json" }, // JSON 형식으로 데이터 전송
    });
  },
  sendIDAndPassword: async (name, phone) => {
    const params = { username: name, phone_number: phone };
    return await axios.post(KH_DOMAIN + "/idandpw", params);
  },
};

export default AxiosApi3;
