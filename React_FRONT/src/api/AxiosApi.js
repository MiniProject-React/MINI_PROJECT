import axios from "axios";
const KH_DOMAIN = "http://localhost:8112";

const AxiosApi = {
  login: async (email, pw) => {
    console.log("이메일 : ", email);
    console.log("패스워드 : ", pw);
    const login = {
      email: email,
      password: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  regCheck: async (email) => {
    return await axios.get(KH_DOMAIN + `/auth/exists/${email}`);
  },
  signup: async (email, pw, name) => {
    console.log("이메일 : ", email);
    console.log("패스워드 : ", pw);
    console.log("이름 : ", name);
    const member = {
      email: email,
      password: pw,
      name: name,
    };
    return await axios.post(KH_DOMAIN + `/auth/signup`, member);
  },
  // 전체 회원 조회
  memberList: async () => {
    return await axios.get(KH_DOMAIN + "/members");
  },
  // 개별 회원 조회
  memberInfo: async (email) => {
    return await axios.get(KH_DOMAIN + `/members/${email}`);
  },
};

export default AxiosApi;
