import { useContext, useEffect, useState } from "react";
import AxiosApi from "../../../api/AxiosApi3";
import { UserSearchContext } from "../../../api/provider/UserSearchContextProvider";
import { PageNavigate } from "../../../api/Pagination/PageNavigate";
import AdminUsersModal from "./AdminUsersModal";

const AdminUsers = () => {
  const { searchKeyword } = useContext(UserSearchContext);
  const [userList, setUserList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [userId, setUserId] = useState("");

  // 유저 리스트 출력
  useEffect(() => {
    console.log("전역변수 확인 ", searchKeyword);
    UserList();
  }, [searchKeyword]);

  // 유저 삭제 처리
  const UserList = async (cpage) => {
    console.log("Page changed:", cpage); // 페이지 변경 시 로그 출력
    cpage = cpage || 1;
    const params = {
      ...searchKeyword,
      currentPage: cpage,
      pageSize: 5,
    };

    const rsp = await AxiosApi.userList(params);
    setUserList(rsp.data.userList);
    setCurrentPage(cpage);
    setTotalCnt(rsp.data.totalCount);
  };

  const clickDelete = (userId) => {
    const userConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (userConfirmed) {
      setConfirmed(true);
      setUserId(userId);
    } else {
      setConfirmed(false);
    }
  };

  const userDelete = async () => {
    try {
      const rsp = await AxiosApi.userDelete(userId);
      if (rsp.data === true) {
        alert("회원 삭제에 성공했습니다.");
      } else {
        alert("회원 삭제에 실패하였습니다.");
      }
    } catch (error) {
      alert("에러가 발생했습니다.");
    }
  };

  const modalState = (user_id) => {
    setUserId(user_id);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    UserList();
  };

  const OrderList = (user_id) => {
    window.location.href = `/users/orderlist/${user_id}`;
  };
  useEffect(() => {
    if (confirmed && userId) {
      userDelete();
    }
  }, [confirmed, userId]); // confirmed와 userId가 변경될 때만 실행

  return (
    <>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>유저 번호</th>
            <th>이름</th>
            <th>ID</th>
            <th>PASSWORD</th>
            <th>권한</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td onClick={() => modalState(user.user_id)}>
                  {user.username}
                </td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => OrderList(user.user_id)}
                  >
                    주문 목록 조회
                  </button>
                  <button
                    className="btn btn-warning ml-2"
                    onClick={() => clickDelete(user.user_id)} // 삭제 클릭 시 확인 상태 관리
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-warning">
                <strong>데이터가 없습니다.</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PageNavigate
        totalItemsCount={totalCnt}
        onChange={UserList}
        itemsCountPerPage={5}
        activePage={currentPage}
      ></PageNavigate>
      <AdminUsersModal
        user_id={userId}
        open={modal}
        close={closeModal}
        type={true}
      ></AdminUsersModal>
    </>
  );
};

export default AdminUsers;
