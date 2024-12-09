import { useState } from "react";

// 비밀번호 확인 모달 컴포넌트
const PasswordCheckModal = ({ onVerify }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(password);
  };

  return (
    <div>
      <h3>비밀번호 확인</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default PasswordCheckModal;
