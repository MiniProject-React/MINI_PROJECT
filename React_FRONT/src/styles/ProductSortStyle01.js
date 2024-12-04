import styled from "styled-components";

export const ProductSort = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  width: 100% - 200px;
  margin-left: 200px;
`;

export const ProductSortList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductCard = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ccc;
  border-bottom: none;
  width: 90%;
`;

export const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  align-items: flex-end;

  h3 {
    font-size: 1.2em;
    margin: 0;
    font-weight: bold;
  }

  p {
    margin: 3px 0;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 30px;
    height: 30px;
    font-size: 1.2em;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
    }

    &:active {
      background-color: #d0d0d0;
    }
  }

  span {
    font-size: 1.2em;
    margin: 0 5px;
  }
`;

export const AddToCartButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  max-width: 200px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PlaceholderImage = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #aaa;
  font-size: 0.9em;
  text-align: center;
`;
