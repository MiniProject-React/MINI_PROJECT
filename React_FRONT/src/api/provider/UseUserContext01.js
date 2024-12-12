import { useContext } from "react";
import { UserContext } from "./UserContextProvider";

export const UseUserContext01 = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseContext01 must be used within a UserContextProvider");
  }
  return context;
};
export default UseUserContext01;
