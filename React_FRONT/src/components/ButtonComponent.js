import styled, { css } from "styled-components";
import React from "react";

const StyledButton = styled.button`
  margin: 0 30px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 10px;
  border: orange;
  font-weight: 700;

  ${(props) =>
    props.enabled &&
    css`
      background-color: black;
    `};

  &:active {
    border: #999;
    font-weight: 700;
    background-color: #999;
  }
`;

const ButtonComponent = ({ enabled, onClick, children }) => {
  return (
    <StyledButton enabled={enabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default ButtonComponent;
