import { useEffect, useState } from "react";
import AxiosApi3 from "../../api/AxiosApi3";

// users에서 휴대폰 번호가 존재하는 지 확인 한다.
// 이름과 휴대폰 번호를 입력 받고 인증 번호를 전송해 준다
//
const Find_ID_or_PW = () => {
  // 전화번호 입력 상태 관리
  const [phone, setPhone] = useState("");
  // 이름 입력 상태 관리
  const [name, setName] = useState("");
  // 이름과 전화번호 DB 회원 정보 조회 검증 상태 관리
  const [ourMember, setOurMember] = useState(false);
  // 전송한 코드 확인
  // 입력 받은 코드 확인
  const [inputCode, setInpuCode] = useState("");
  // 문자 전송 버튼 한번만 클릭 되도록
  const [sendSMS, setSendSMS] = useState(false);
  // 입력한 이름과 전화번호과 DB에 존재하는 지 확인
  const ValidUserInfo = async () => {
    console.log("id/pw 찾기 이름 : ", name);
    console.log("id/pw 찾기 폰 : ", phone);
    const rsp = await AxiosApi3.validUserInfo(name, phone);
    if (rsp.data === true) {
      SendSMS(phone);
      setOurMember(true);
    } else if (rsp.data === false) {
      alert("올바른 회원 정보를 입력하세요.");
    }
  };

  // 인증 번호 SMS 발송
  const SendSMS = async (phone) => {
    console.log("SendSMS", phone);
    const rsp = await AxiosApi3.sendingSMS(phone);
  };

  // 인증번호 검증
  const ValidCode = async () => {
    const rsp = await AxiosApi3.varify_code(inputCode);
    if (rsp.data.status === "success") {
      SendIDAndPassword(name, phone);
    }
  };

  // 검증 확인시 회원 이메일로 ID와 패스워드 전송
  const SendIDAndPassword = async (name, phone) => {
    const rsp = await AxiosApi3.sendIDAndPassword(name, phone);
    if (rsp.data === true) {
      alert("등록하신 이메일을 확인하세요 ID/PW가 전송되었습니다.");
    }
  };

  // 폰번호에 - 부여
  // 하이픈을 추가하는 함수
  const formatPhoneNumber = (value) => {
    // 숫자만 남기고 모두 제거
    let phoneNumber = value.replace(/[^\d]/g, "");

    // 7자리 이상일 때 하이픈 추가
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
    } else {
      return (
        phoneNumber.slice(0, 3) +
        "-" +
        phoneNumber.slice(3, 7) +
        "-" +
        phoneNumber.slice(7, 11)
      );
    }
  };

  const handleChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div
        className="text-center p-4 rounded shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2>이름</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>휴대폰번호</h2>
        <input
          type="tel"
          className="form-control mb-3"
          placeholder="번호를 입력해주세요"
          value={phone}
          onChange={handleChange}
        />
        {ourMember ? (
          <>
            <input
              type="text"
              className="form-control mb-3"
              onChange={(e) => setInpuCode(e.target.value)}
              placeholder="코드를 입력해주세요"
            ></input>
            <button className="btn btn-secondary w-100" onClick={ValidCode}>
              확인
            </button>
          </>
        ) : (
          <button className="btn btn-secondary w-100" onClick={ValidUserInfo}>
            ID / PASSWORD 찾기
          </button>
        )}
      </div>
    </div>
  );
};

export default Find_ID_or_PW;
