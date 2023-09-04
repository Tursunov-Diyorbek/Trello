import styled from "styled-components";
import Box from "@mui/material/Box";

export const styles = {
  board: { background: "#aaa", p: 2, width: 240 },
  list: {},
};

export const StyledList = styled(Box)`
  background: #f1f2f4;
  padding: 16px;
  width: 300px;
  border-radius: 16px;
  background-color: #333;
  color: red;

  .list {
    padding: 8px 16px;
    border-radius: 10px;
    margin-bottom: 8px;
    cursor: pointer;
    background-color: black;
    box-shadow: 4px 4px 8px 0px rgba(249, 13, 13, 0.2);
    &:hover {
      background-color: white;
    }
  }
`;
