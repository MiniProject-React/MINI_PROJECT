import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../../../components/InputComponent";
import { Container, Items } from "../../../components/SignupComponent";
import Button from "../../../components/ButtonComponent";
import MyComponent from "../../../components/MyComponent";
import { ModalStyle, ModalButton } from "../style/ModalStyle";
import { useEffect, useState } from "react";
import AxiosApi from "../../../api/AxiosApi3";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { StyledPasswordMask } from "../../../components/InputComponent";
const AdminUsersModal = (props) => {
  const { open, close, type, user_id } = props;
  const navigate = useNavigate();
  // 키보드 입력
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [markedConPw, setMarkedConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  // 오류 메시지
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [phMessage, setPhMessage] = useState("");
  const [phMessage1, setPhMessage1] = useState("");
  //주소 입력
  const [postcode, setPostcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 기본 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
  //전화 번호 입력
  const [ph, setPh] = useState("");
  const [hpFst, setHpFst] = useState("010"); // 초기값 010
  const [hpMid, setHpMid] = useState("");
  const [hpLst, setHpLst] = useState("");
  // 유효성 검사
  const [isPw, setIsPw] = useState(true);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(true);
  // 전번 유효성 검사
  const [isPh, setIsPh] = useState(true);
  const [isPh1, setIsPh1] = useState(true);
  const [isDaumLoaded, setIsDaumLoaded] = useState(true);
  // 주소 입력 유효성 검사
  const [isPost, setIsPost] = useState(true);
  const [isAddr, setIsAddr] = useState(true);
  const [isDAddr, setIsDAddr] = useState(true);
  const [detailUserInfoList, setDetailUserInfoList] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // IME 조합 상태

  const KH_DOMAIN = "http://localhost:8112";

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsDaumLoaded(true); // Daum API가 로드되었을 때 상태 업데이트
    document.head.appendChild(script);
    setIsPost(postcode.length > 0);
    setIsAddr(address.length > 0);
    UnionFirst();
    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [address, postcode, hpFst, hpMid, hpLst]); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  // 상세회원 정보 조회
  useEffect(() => {
    if (open && user_id) {
      DetailUserInfo(user_id);
    }
  }, [user_id]);

  const DetailUserInfo = async () => {
    try {
      const rsp = await AxiosApi.detailUserInfo(user_id);
      setDetailUserInfoList(rsp.data.detailUser[0]);
      setInputName(rsp.data.detailUser[0].username);
      setInputEmail(rsp.data.detailUser[0].email);

      const [post, addr, daddr] = rsp.data.detailUser[0].address.split(":");
      setPostcode(post || "");
      setAddress(addr || "");
      setDetailAddress(daddr || "");
      const [ph1, ph2, ph3] = rsp.data.detailUser[0].phone_number.split("-");
      setHpFst(ph1);
      setHpMid(ph2);
      setHpLst(ph3);
      const pw = rsp.data.detailUser[0].password;
      setInputPw(pw);
    } catch (error) {
      alert("상세 회원 정보 조회 중 오류가 발생했습니다.");
    }
  };

  // 카카오 주소 분할
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setDetailAddress("");
  };

  const handleClick1 = () => {
    if (isDaumLoaded) {
      const { daum } = window;
      new daum.Postcode({
        oncomplete: handleComplete,
      }).open();
    } else {
      console.log("Daum Postcode API is not loaded yet.");
    }
  };

  const onChangePw = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };

  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    console.log(inputPw);
    console.log(e.target.value);

    // 조합 중이 아닌 경우에만 상태 업데이트

    setInputConPw(passwordCurrent); // 원래 값 저장
    console.log(inputConPw);
    // 비밀번호 일치 여부 체크
    if (passwordCurrent !== inputPw) {
      setConPwMessage("비밀번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀번호가 일치합니다.");
      setIsConPw(true);
    }
  };

  const onChageMidPh = (e) => {
    const phRegex = /^\d{4}$/;
    const midPhCurrent = e.target.value;
    console.log(midPhCurrent);
    setHpMid(midPhCurrent);
    if (!phRegex.test(midPhCurrent)) {
      setPhMessage("4자리 숫자로 입력해 주세요.");
      setIsPh(false);
    } else {
      setPhMessage("확인되었습니다.");
      setIsPh(true);
    }
  };
  const onChageLstPh = (e) => {
    const phRegex = /^\d{4}$/;
    const lstPhCurrent = e.target.value;
    console.log(lstPhCurrent);
    setHpLst(lstPhCurrent);
    if (!phRegex.test(lstPhCurrent)) {
      setPhMessage1("4자리 숫자로 입력해 주세요.");
      setIsPh1(false);
    } else {
      setPhMessage1("확인되었습니다.");
      setIsPh1(true);
    }
  };

  const onChangeName = (e) => {
    const newName = e.target.value;
    setInputName(newName);
    setDetailUserInfoList((prevState) => ({
      ...prevState,
      username: newName, // username을 변경
    }));
    setIsName(true);
  };

  const UnionFirst = () => {
    const phoneNumber = `${hpFst}-${hpMid}-${hpLst}`;
    const fullAddress = `${postcode}:${address}:${detailAddress}`;

    setPh(hpFst + "-" + hpMid + "-" + hpLst);
    setInputAddress(postcode + ":" + address + ":" + detailAddress);
    // 콘솔에서 값 확인 (디버깅용)
    console.log("Phone:", phoneNumber);
    console.log("Address:", fullAddress);

    // 상태 업데이트
    setDetailUserInfoList((prevState) => ({
      ...prevState,
      phone_number: phoneNumber,
      address: fullAddress,
    }));
  };

  const onClickLogin = async () => {
    console.log(ph);
    console.log(inputAddress);
    try {
      const memberReg = await AxiosApi.userupdate(
        inputEmail,
        inputPw,
        inputName,
        inputAddress,
        ph
      );
      console.log(memberReg.data);
      if (memberReg.data) {
        alert("회원 수정에 성공하였습니다.");
        navigate("/users");
      } else {
        // setModalOpen(true);
        // setModelText("회원 가입에 실패 했습니다.");
        alert("회원 수정에 실패 했습니다.");
      }
    } catch (e) {
      alert("서버가 응답하지 않습니다.");
    }
  };
  const onChangePostCode = (e) => {
    const newPostCode = e.target.value.trim();
    console.log(newPostCode);
    setPostcode(newPostCode);

    // 빈 문자열 또는 null 체크
    setIsPost(newPostCode !== "" && newPostCode !== null);
  };

  const onChangeAddr = (e) => {
    const newAddr = e.target.value;
    console.log(newAddr);
    setAddress(newAddr);
    setIsAddr(newAddr.length > 0);
  };

  const onChangeDAddr = (e) => {
    const newDAddr = e.target.value;
    console.log(newDAddr);
    setDetailAddress(newDAddr);
    setIsDAddr(newDAddr.length > 0);
  };

  return (
    <ModalStyle>
      <div
        className={open ? "modal fade show d-block" : "modal fade"}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {open && (
          <section>
            <div className="modal-dialog">
              <div className="modal-content">
                <header className="modal-header">
                  <h2 className="modal-title">회원 정보 수정</h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => close()}
                  />
                </header>
                <main>
                  {" "}
                  <Container>
                    <Items className="sign">
                      <span>회원 가입</span>
                    </Items>
                    {detailUserInfoList ? (
                      <>
                        <Items variant="item2">
                          <Input
                            type="email"
                            placeholder="이메일"
                            value={detailUserInfoList.email}
                            disabled
                          />
                        </Items>
                        <Items variant="item2">
                          <StyledPasswordMask
                            type="password"
                            placeholder="패스워드"
                            value={inputPw}
                            onChange={onChangePw}
                            isValid={isPw}
                          />
                        </Items>
                        <Items variant="hint">
                          {inputPw.length > 0 && (
                            <span
                              className={`message ${
                                isPw ? "success" : "error"
                              }`}
                            >
                              {pwMessage}
                            </span>
                          )}
                        </Items>
                        <Items variant="item2">
                          <StyledPasswordMask
                            type="text"
                            placeholder="비밀번호 확인"
                            value={inputConPw} // 마스킹된 값만 화면에 표시
                            onChange={onChangeConPw}
                          />
                        </Items>
                        <Items variant="hint">
                          {inputPw.length > 0 && (
                            <span
                              className={`message ${
                                isConPw ? "success" : "error"
                              }`}
                            >
                              {conPwMessage}
                            </span>
                          )}
                        </Items>
                        <Items variant="item2">
                          <Input
                            type="text"
                            placeholder="이름"
                            value={detailUserInfoList.username}
                            onChange={onChangeName}
                            isValid={isName}
                          />
                        </Items>
                        <Items varient="addres">
                          {isAddr ? (
                            <MyComponent
                              enabled
                              isValid={isAddr}
                              onClick={handleClick1}
                            >
                              주소 확인
                            </MyComponent>
                          ) : (
                            <MyComponent enabled onClick={handleClick1}>
                              주소확인
                            </MyComponent>
                          )}
                        </Items>
                        <Items>
                          <Input
                            type="text"
                            placeholder="우편번호"
                            value={postcode}
                            onChange={onChangePostCode}
                            disabled
                            isValid={isPost}
                          />
                        </Items>
                        <Items>
                          <Input
                            type="text"
                            placeholder="주소"
                            value={address}
                            onChange={onChangeAddr}
                            disabled
                            isValid={isAddr}
                          />
                        </Items>
                        <Items>
                          <Input
                            type="text"
                            placeholder="상세 주소"
                            value={detailAddress}
                            onChange={onChangeDAddr}
                            isValid={isDAddr}
                          />
                        </Items>
                        <Items variant="phone">
                          <Input placeholder="전화번호" value="010" readOnly />
                          <Input
                            type="number"
                            placeholder="전화번호"
                            value={hpMid}
                            onChange={onChageMidPh}
                            isValid={isPh}
                          />
                          <Input
                            type="text"
                            placeholder="전화번호"
                            value={hpLst}
                            onChange={onChageLstPh}
                            isValid={isPh1}
                          />
                        </Items>
                        <Items variant="hint">
                          {hpMid.length > 3 && (
                            <span
                              className={`message ${
                                isPh ? "success" : "error"
                              }`}
                            >
                              {phMessage}
                            </span>
                          )}
                        </Items>
                        <Items variant="hint">
                          {hpLst.length > 3 && (
                            <span
                              className={`message ${
                                isPh1 ? "success" : "error"
                              }`}
                            >
                              {phMessage1}
                            </span>
                          )}
                        </Items>
                        <Items variant="item2">
                          {console.log(
                            isPw,
                            isConPw,
                            isName,
                            isPh,
                            isPh1,
                            isPost,
                            isAddr,
                            isDAddr
                          )}
                          {isPw &&
                          isConPw &&
                          isName &&
                          isPh &&
                          isPh1 &&
                          isAddr &&
                          isDAddr ? (
                            <Button enabled onClick={onClickLogin}>
                              수정
                            </Button>
                          ) : (
                            <Button disabled>수정</Button>
                          )}
                        </Items>
                      </>
                    ) : (
                      <p>상세 정보를 불러오는 중입니다...</p>
                    )}
                  </Container>
                </main>
                <footer>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => close()}
                  >
                    취소
                  </button>
                </footer>
              </div>
            </div>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default AdminUsersModal;
