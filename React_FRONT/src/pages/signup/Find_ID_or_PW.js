import { useState } from "react";
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
  const [code, setCode] = useState("");
  // 입력 받은 코드 확인
  const [inputCode, setInpuCode] = useState("");
  // 입력한 이름과 전화번호과 DB에 존재하는 지 확인
  const VaildUserInfo = async () => {
    console.log("id/pw 찾기 이름 : ", name);
    console.log("id/pw 찾기 폰 : ", phone);
    const rsp = await AxiosApi3.validUserInfo(name, phone);
    if (rsp.data === true) {
      SendSMS();
      setOurMember(true);
    } else if (rsp.data === false) {
      alert("존재하지않는 회원 정보입니다.");
    }
  };

  // 인증 번호 SMS 발송
  const SendSMS = async () => {
    const rsp = await AxiosApi3.sendingSMS(name, phone);
    setCode(rsp.data);
  };

  // 인증번호 검증
  const ValidCode = () => {
    if (code === inputCode) {
      SendIDAndPassword();
    } else {
      alert("틀린 번호 입니다.");
    }
  };

  // 검증 확인시 회원 이메일로 ID와 패스워드 전송
  const SendIDAndPassword = async () => {
    const rsp = await AxiosApi3.sendIDAndPassword();
    if (rsp.data === true) {
      alert("등록하신 이메일을 확인하세요 ID/PW가 전송되었습니다.");
    }
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
          value={phone}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>휴대폰번호</h2>
        <input
          type="tel"
          className="form-control mb-3"
          placeholder="번호를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          <button className="btn btn-secondary w-100" onClick={VaildUserInfo}>
            ID / PASSWORD 찾기
          </button>
        )}
      </div>
    </div>
  );
};

export default Find_ID_or_PW;
