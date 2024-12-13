import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser || { isLogin: false, email: "", userName: "", role: "" };
  });

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // 업데이트 시 localStorage 저장
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
