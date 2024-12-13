import { useState, createContext, useEffect } from "react";

// 전역 변수 정의
export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem("email" || null));
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]);

  return (
    <UserContext.Provider
      value={{ email, setEmail, userName, setUserName, role, setRole }}
    >
      {children}
    </UserContext.Provider>
  );
};
