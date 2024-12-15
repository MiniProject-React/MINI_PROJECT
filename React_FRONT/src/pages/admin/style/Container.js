import styled from "styled-components";

export const Container = styled.div`
  width: 100vh -100;
  margin: 100px 100px;
  height: 700px;
`;

export const Container1 = styled.div`
  width: calc(
    100vh - 100px
  ); // 100vh - 100px로 변경하여 올바른 계산이 이루어지도록 함
  margin: 100px;
  height: 700px;
  overflow: auto; // 넘치는 부분에 스크롤이 생기도록 설정
`;
