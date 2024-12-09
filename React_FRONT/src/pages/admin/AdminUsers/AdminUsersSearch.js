import AxiosApi from "../../../api/AxiosApi3";
import { UserSearchContext } from "../../../api/provider/UserSearchContextProvider";
import { useContext, useEffect, useState } from "react";

export const AdminUsersSearch = () => {
  const { setSearchKeyword } = useContext(UserSearchContext);
  const [role, setRole] = useState("");
  const [input, setInput] = useState({
    searchKeyword: "",
    searchCondition: "username",
    searchRole: "",
  });

  useEffect(() => {
    selectRole();
  }, []);

  useEffect(() => {
    handlerSearch();
  }, [input]);

  // 검색 기능
  const handlerSearch = () => {
    setSearchKeyword(input);
  };

  // 권한 검색
  const selectRole = async () => {
    const rsp = await AxiosApi.roleSearch();
    setRole(rsp.data.roleList);
  };

  // 권한 검색 변경 확인
  const checkRoleChange = (e) => {
    const newRole = parseInt(e.currentTarget.value, 10); // 선택한 값을 숫자 타입으로 변환
    setInput({ ...input, searchRole: newRole }); // 상태 업데이트
    handlerSearch(newRole); // 새 값을 전달
  };

  return (
    <>
      <div className="d-flex flex-row mb-3">
        <div className="me-3">
          <select className="form-select" onChange={checkRoleChange}>
            <option value={-1}>전체</option>
            {role && role.length > 0 ? (
              role.map((a, i) => (
                <option key={i} value={a.role}>
                  {a.role === 0 ? "회원" : a.role === 1 ? "관리자" : "VIP"}
                </option>
              ))
            ) : (
              <option value="">데이터 없음</option>
            )}
          </select>
        </div>
        <div className="me-3">
          <select
            className="form-select"
            onChange={(e) =>
              setInput({ ...input, searchCondition: e.currentTarget.value })
            }
          >
            <option value="username">이름</option>
            <option value="email">이메일</option>
          </select>
        </div>
        <div className="me-3">
          <input
            className="form-control"
            type="text"
            onChange={(e) =>
              setInput({ ...input, searchKeyword: e.currentTarget.value })
            }
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={handlerSearch}>
            검색
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminUsersSearch;
