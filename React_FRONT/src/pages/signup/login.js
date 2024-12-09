import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/ButtonComponent";
import Input from "../../components/InputComponent";
import { Container, Items } from "../../components/SignupComponent";
import AxiosApi from "../../api/AxiosApi3";
import Modal from "../../utils/Modal";
import { UserContext } from "../../api/provider/UserContextProvider";

const Img = styled.img`
  width: 180px;
  object-fit: cover;
`;

const Login = () => {
  const { setIsLogin, setUserId, setEmail, setRole, setUserName } =
    useContext(UserContext);
  // State for inputs
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 모달 (Modal) 창을 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창에 대한 문구
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();

  // State for validation
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const { updateUser } = useContext(UserContext);

  // Modal 모달창 닫는 함수
  const closeMadal = () => {
    setModalOpen(false);
  };

  // Modal 모달창 confirm 동작 함수
  const confirmModal = () => {
    console.log("Confirm 버튼이 눌러졌습니다.");
    closeMadal();
  };

  // Email and Password change handlers
  const handleInputChange = (e, setState, setValidState) => {
    setState(e.target.value);
    setValidState(e.target.value.length >= 5);
  };

  const roleCheck = async () => {
    try {
      const rsp = await AxiosApi.roleCheck(inputEmail, inputPw);
      const userData = rsp.data.roleCheck[0];

      updateUser({
        isLogin: true,
        email: inputEmail,
        userName: userData.username,
        role: userData.role,
      });

      onClickLogin(userData);
    } catch (e) {
      alert("서버가 응답하지 않습니다."); // 모달 구문 추가하며 뻄
    }
  };
  const onClickLogin = async (role) => {
    console.log("로그인으로 넘어오나");
    try {
      const rsp = await AxiosApi.login(inputEmail, inputPw);
      // 로그인 수정 등급을 가져와서 등급에서 따라 다른 곳으로 navigate
      localStorage.setItem("email", inputEmail);
      localStorage.setItem("isLogin", "TRUE");
      console.log(rsp.data);

      if (role.role === 0) {
        navigate("/");
      } else if (role.role === 1) {
        navigate("/admin");
      } else {
        // alert("아이디 및 패스워드가 틀립니다.");   // 모달 구문 추가하며 뻄
        setModalOpen(true);
        setModalContent("아이디 혹은 패스워드가 일치하지 않습니다.");
      }
    } catch (e) {
      //alert("서버가 응답하지 않습니다.");     // 모달 구문 추가하며 뻄
      setModalOpen(true);
      setModalContent("로그인 서버가 응답하지 않습니다.");
    }
  };

  return (
    <Container>
      <Items variant="sign"></Items>

      <Items margin="10px">
        <Input
          placeholder="이메일"
          value={inputEmail}
          onChange={(e) => handleInputChange(e, setInputEmail, setIsId)}
        />
      </Items>

      <Items margin="10px">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={(e) => handleInputChange(e, setInputPw, setIsPw)}
        />
      </Items>

      <Items margin="10px">
        {isId && isPw ? (
          <Button enabled onClick={roleCheck}>
            SIGN IN
          </Button>
        ) : (
          <Button disabled>SIGN IN</Button>
        )}
      </Items>

      <Items variant="signup">
        <Link to="/Signup" className="link_style">
          <span>Sign Up</span>
        </Link>
      </Items>

      <Modal
        open={modalOpen}
        close={closeMadal}
        header="오류"
        type={true}
        confirm={confirmModal}
      >
        {modalContent}
      </Modal>
    </Container>
  );
};

export default Login;
