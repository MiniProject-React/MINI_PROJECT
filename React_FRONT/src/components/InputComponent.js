import styled from "styled-components";
import PasswordMask from "react-password-mask"; // 또는 사용하려는 라이브러리의 이름

// StyledInput 컴포넌트
const StyledInput = styled.input`
  margin: 0 30px;
  width: 100%;
  height: auto;
  line-height: normal;
  border: ${(props) =>
    props.isValid ? "3px solid #32cd32" : "1px solid #ccc"};
  padding: 1em;
  border-radius: 18px;
  outline: none;
  transition: border 0.3s ease; /* 부드러운 전환 효과 추가 */
`;

// InputComponent 컴포넌트
const InputComponent = ({ value, onChange, placeholder, isValid }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isValid={isValid} // 유효성 prop 전달
    />
  );
};

export default InputComponent;

// StyledPasswordMask 컴포넌트
export const StyledPasswordMask = styled(PasswordMask)`
  margin: 0 30px;
  width: 100%;
  height: auto;
  line-height: normal;
  border: ${(props) =>
    props.isValid ? "3px solid #32cd32" : "1px solid #ccc"};
  padding: 1em;
  border-radius: 18px;
  outline: none;
  transition: border 0.3s ease;
`;
