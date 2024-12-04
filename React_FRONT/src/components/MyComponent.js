import styled, { css } from "styled-components";
import React from "react";

const StyledButton = styled.button`
  margin:  0;
  font-weight: bold;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 18px;
  border: orange;
  font-weight: 700;

  ${(props) =>
    props.isValid &&
    css`
      background-color: green;
    `};

  &:active {
    border: #999;
    font-weight: 700;
    background-color: #999;
  }
`;

const MyComponent = ({ isValid, onClick, children }) => {
  return (
    <StyledButton onClick={onClick} isValid={isValid}>
      {children}
    </StyledButton>
  );
};

export default MyComponent;
