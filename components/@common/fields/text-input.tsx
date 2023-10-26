"use client";
import React from "react";
import styled, { keyframes } from "styled-components";
import { fontSize16 } from "../font-size";

export const TextInput = styled.input.attrs(() => ({ type: "text" }))<{
  hasError?: boolean;
}>`
  background-color: #fff;
  border: thin solid grey;
  border-radius: 4px;
  caret-color: #000;
  color: #000;
  display: block;
  font-size: ${fontSize16};
  padding: 0.75em 1em;
  width: 100%;
  box-sizing: border-box;

  :focus {
    outline-color: royalblue;
    outline-style: solid;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  ::placeholder {
    color: grey;
  }
`;

const kf = keyframes`
  from {
    transform: translateX(-100%);
  }
  to   {
    transform: translateX(100%);
  }
`;

const LoadingAnimation = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  border-radius: 0.25em;
  z-index: 100;
  background-image: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0.33),
    royalblue,
    royalblue,
    rgba(255, 255, 255, 0.33)
  );
  animation: 2000ms ${kf} ease-in-out infinite;
`;

const LoadingInputContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
`;

const LoadingInput = styled.input.attrs(() => ({
  type: "text",
  disabled: true,
}))<{
  hasError?: boolean;
}>`
  background-color: #fff;
  border: none;
  border-radius: 4px;
  caret-color: #000;
  color: #000;
  display: block;
  font-size: ${fontSize16};
  padding: 0.75em 1em;
  width: 100%;
  box-sizing: border-box;
  outline-color: royalblue;

  :focus {
    outline-color: royalblue;
    outline-style: solid;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  ::placeholder {
    color: grey;
  }
`;

export const LoadingTextInput = (
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "disabled">
) => {
  return (
    <LoadingInputContainer>
      <LoadingInput {...props} />
      <LoadingAnimation />
    </LoadingInputContainer>
  );
};
