import styled from "styled-components";
import { fontSize16 } from "../../font-size";

export const Select = styled.select`
  background-color: #f3f6f9;
  border-radius: 4px;
  border: 1px solid grey;
  color: #000;
  cursor: pointer;
  font-size: ${fontSize16};
  padding: 0.5em;
  width: 100%;

  :disabled {
    cursor: not-allowed;
  }
`;
