import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  background-color: #f9f9f9; /* 연한 회색 배경 */
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #0056b3; /* 진한 파란색 */
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333; /* 진한 회색 */
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff; /* 파란색 강조 */
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

const EditButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? "#6c757d" : "#007bff")};
  &:hover {
    background-color: ${(props) =>
      props.cancel ? "#5a6268" : "#0056b3"}; /* hover 색상 */
  }
`;

const UserProfile01 = ({ user }) => {
  // 유저 정보를 상태로 관리
  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
    username: user.username,
    address: user.address,
    phone_number: user.phone_number,
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null); // 새 비밀번호 일치 여부

  // 새 비밀번호 일치 여부 체크
  useEffect(() => {
    if (formData.newPassword && formData.confirmNewPassword) {
      setPasswordMatch(formData.newPassword === formData.confirmNewPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [formData.newPassword, formData.confirmNewPassword]);

  // 비밀번호 일치 여부 메시지 스타일
  const PasswordMatchMessage = ({ isMatch, children }) => (
    <div
      style={{
        color: isMatch ? "green" : "red",
        fontSize: "12px",
      }}
    >
      {children}
    </div>
  );

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 수정 모드 토글
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // 변경 사항 저장 핸들러
  const handleSave = () => {
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("저장된 데이터:", formData);
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <Title>개인 정보 조회/수정</Title>
      <form>
        <FormRow>
          <Label>이메일</Label>
          <Input type="email" value={formData.email} disabled />
        </FormRow>
        {isEditing && (
          <>
            <FormRow>
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow>
              <Label>새 비밀번호 확인</Label>
              <Input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
            </FormRow>
            {passwordMatch !== null && (
              <PasswordMatchMessage isMatch={passwordMatch}>
                {passwordMatch
                  ? "새 비밀번호가 일치합니다."
                  : "새 비밀번호가 일치하지 않습니다."}
              </PasswordMatchMessage>
            )}
          </>
        )}
        <FormRow>
          <Label>이름</Label>
          <Input
            type="text"
            value={formData.username}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <Label>주소</Label>
          <Input
            type="text"
            value={formData.address}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <Label>전화번호</Label>
          <Input
            type="text"
            value={formData.phone_number}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </FormRow>
        <div>
          {!isEditing ? (
            <EditButtonGroup>
              <StyledButton type="button" onClick={toggleEditMode}>
                수정
              </StyledButton>
            </EditButtonGroup>
          ) : (
            <EditButtonGroup>
              <StyledButton type="button" onClick={handleSave}>
                저장
              </StyledButton>
              <StyledButton type="button" cancel onClick={toggleEditMode}>
                취소
              </StyledButton>
            </EditButtonGroup>
          )}
        </div>
      </form>
    </ProfileContainer>
  );
};

export default UserProfile01;
