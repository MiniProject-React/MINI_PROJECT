import { useEffect, useState, createContext, useContext } from "react";
import AdminUsersSearch from "../../pages/admin/AdminUsers/AdminUsersSearch";
import AdminUsers from "../../pages/admin/AdminUsers/AdminUsers";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
const defaultValue = {
  searchkeyword: {},
  setSearchKeyword: () => {},
  selectColumn: {},
  setSelectColumn: () => {},
  selectRole: {},
  setSelectRole: () => {},
};

export const UserSearchContext = createContext(defaultValue);

export const UserContextProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState({});

  return (
    <UserSearchContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </UserSearchContext.Provider>
  );
};

export const AdminUsersMap = () => {
  const navigate = useNavigate();
  const { email } = useContext(UserContext);
  useEffect(() => {
    // console.log("contextAPI로 email 검증 확인 : ", email);
    // if (!email) {
    //   navigate("/");
    // }
  }, [email, navigate]);
  return (
    <>
      <UserContextProvider>
        <h1>회원 정보</h1>
        <AdminUsersSearch></AdminUsersSearch>
        <AdminUsers></AdminUsers>
      </UserContextProvider>
    </>
  );
};
