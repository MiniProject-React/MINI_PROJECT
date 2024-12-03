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
 roleCheck: async (email, password) => {
   console.log("이메일 : ", email);
   console.log("패스워드 : ", password);

   const params = {
     email: email,
     password: password,
   };

   return await axios.get(KH_DOMAIN + "/auth/roleCheck", { params });
 }

};

export default AxiosApi;
