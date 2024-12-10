import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  max-width: 1200px;
  min-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

export const Sidebar = styled.div`
  flex: 1; /* 컴포넌트 선택 섹션 */
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #d0d0d0;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const Content = styled.div`
  flex: 4;
  padding: 20px;
  overflow-y: auto;
`;
