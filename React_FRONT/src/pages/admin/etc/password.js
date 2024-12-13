import React, { useState, useRef } from "react";
import PasswordMask from "react-password-mask";

const PasswordInput = () => {
  const [password, setPassword] = useState(""); // 비밀번호 입력값 상태 관리
  const passwordRef = useRef(null); // 입력 필드 참조

  // 비밀번호 입력 시 처리
  const handlePasswordChange = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value); // 입력값을 상태에 저장
  };

  // 비밀번호 아스터리스크로 출력하기
  const renderPassword = () => {
    return "*".repeat(password.length); // 입력된 길이만큼 '*'로 출력
  };

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        ref={passwordRef} // 입력 필드 참조
        value={password} // 상태에 저장된 값 사용
        onChange={handlePasswordChange} // 값이 변경될 때마다 상태 업데이트
        placeholder="Enter your password"
      />
      <div>
        {/* 입력값은 화면에 아스터리스크로 출력 */}
        {/* <p>{renderPassword()}</p> */}
      </div>
    </div>
  );
};

export default PasswordInput;
