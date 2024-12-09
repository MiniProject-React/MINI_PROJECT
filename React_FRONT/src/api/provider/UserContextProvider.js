import { useState, createContext } from "react";

// 전역 변수 정의
export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  return (
    <UserContext.Provider
      value={{ email, setEmail, userName, setUserName, role, setRole }}
    >
      {children}
    </UserContext.Provider>
  );
};
