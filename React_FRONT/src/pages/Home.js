import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";

export const Container = styled.div`
  display: flex;
  margin: 0px;
`;

const Home = () => {
  const [members, setMembers] = useState("");

  useEffect(() => {
    const getMembers = async () => {
      try {
        const rsp = await AxiosApi.memberList();
        console.log(rsp.data);
        setMembers(rsp.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.", e);
      }
    };
    getMembers();
  });

  return (
    <>
      <br />
      <br />
      <h1>회원 정보 조회</h1>
      <br />
      <table>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>가입일</th>
        </tr>
        {members &&
          members.map((member) => (
            <tr key={member.email}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.date}</td>
            </tr>
          ))}
      </table>
    </>
  );
};

export default Home;
