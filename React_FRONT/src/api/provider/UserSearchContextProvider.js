import { useState, createContext } from "react";
import AdminUsersSearch from "../../pages/admin/AdminUsers/AdminUsersSearch";
import AdminUsers from "../../pages/admin/AdminUsers/AdminUsers";
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
