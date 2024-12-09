import styled from "styled-components";
<<<<<<< HEAD
import PasswordMask from "react-password-mask"; // 또는 사용하려는 라이브러리의 이름
=======
>>>>>>> origin/develop

const StyledInput = styled.input`
  margin: 0 30px;
  width: 100%;
  height: auto;
  line-height: normal;
<<<<<<< HEAD
  border: ${(props) =>
    props.isValid ? "3px solid #32cd32" : "1px solid #ccc"};
  padding: 1em;
  border-radius: 18px;
  outline: none;
  transition: border 0.3s ease; /* 부드러운 전환 효과 추가 */
`;

const InputComponent = ({ value, onChange, placeholder, isValid }) => {
=======
  padding: 1em;
  border: 1px solid #999;
  border-radius: 18px;
  outline-style: none;
`;

const InputComponent = ({ value, onChange, placeholder }) => {
>>>>>>> origin/develop
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
<<<<<<< HEAD
      isValid={isValid} // 유효성 prop 전달
=======
>>>>>>> origin/develop
    />
  );
};

export default InputComponent;
<<<<<<< HEAD

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
=======
>>>>>>> origin/develop
