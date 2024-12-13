import React, { useState } from "react";
import axios from "axios";
const KH_DOMAIN = "http://localhost:8112";
const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [message, setMessage] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verify, setVerify] = useState("");
  const sendNumber = async () => {
    console.log(email);
    try {
      const response = await axios.post(KH_DOMAIN + "/mail", {
        mail: email,
      });
      setSentCode(response.data); // 서버에서 받은 인증 번호 저장
      setIsCodeSent(true);
      setMessage("인증번호 발송");
    } catch (error) {
      setMessage("인증번호 발송 실패");
    }
  };

  const confirmNumber = async () => {
    try {
      const response = await axios.post(KH_DOMAIN + "/verify", {
        inputNumber: enteredCode,
        mail: email,
      });
      const responseMessage = response.data; // 서버에서 받은 응답 메시지
      setVerify(responseMessage); // 상태에 메시지 저장
      console.log(responseMessage); // 서버 응답 확인
      alert(responseMessage); // 응답 메시지 표시
    } catch (error) {
      alert("서버 오류");
    }
  };

  return (
    <div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
        />
        <button type="button" onClick={sendNumber}>
          인증번호 발송
        </button>
      </div>

      {isCodeSent && (
        <div>
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="인증번호 입력"
          />
          <button type="button" onClick={confirmNumber}>
            이메일 인증
          </button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerification;
