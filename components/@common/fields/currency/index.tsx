"use client";

import styled from "styled-components";

import { NumberFieldProps, NumberInput } from "../number";
import { fontSize16 } from "../../font-size";

const Container = styled.div`
  position: relative;
  display: grid;
`;

const StyledNumberInput = styled(NumberInput)`
  padding-left: 1.5em;
`;

const StyledSpan = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.5em;
  color: #000;
  font-size: ${fontSize16};
  line-height: ${fontSize16};
  height: ${fontSize16};
  margin: auto;
`;

export const CurrencyInput = ({ ...props }: NumberFieldProps) => {
  return (
    <Container>
      {/* @ts-ignore */}
      <StyledSpan>$</StyledSpan>
      <StyledNumberInput {...props} />
    </Container>
  );
};
