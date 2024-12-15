import styled from "styled-components";

export const PurchaseContainer = styled.div`
  background-color: #f4f4f4;
  color: #333;
  font-family: "Arial", sans-serif;
  margin: 0 auto;
  padding: 2rem;
  margin: 20px auto;
  width: 60%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #333;
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

export const Input = styled.input`
  padding: 0.3rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const OrderInfo = styled.ul`
  margin-top: 1.5rem;
  list-style-type: none;
  padding: 0;

  & > li {
    background-color: #e8e8e8;
    border-radius: 4px;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 91, 179, 0.3);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
