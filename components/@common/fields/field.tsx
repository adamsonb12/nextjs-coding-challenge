"use client";

import { ReactNode } from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { fontSize12, fontSize14 } from "../font-size";

export interface FieldProps {
  children: ReactNode;
  label?: string;
  clarifier?: string;
  errorMessage?: string;
}

export const Field = ({
  children,
  label,
  clarifier,
  errorMessage,
  ...props
}: FieldProps) => {
  return (
    <FieldWrapper {...props}>
      {label && <FieldLabel>{label}</FieldLabel>}
      {children}
      {clarifier && !errorMessage && (
        <FieldClarifier>{`*${clarifier}`}</FieldClarifier>
      )}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </FieldWrapper>
  );
};

export const FieldWrapper = styled.div`
  display: grid;
  width: 100%;
`;

export const FieldError = ({ children }: { children: ReactNode }) => {
  const { colors } = useTheme();
  return (
    <motion.p
      {...framer_error}
      style={{
        color: colors.danger,
        marginTop: ".5em",
        marginLeft: ".5em",
        textAlign: "left",
        fontSize: fontSize12,
      }}
    >
      {children}
    </motion.p>
  );
};

export const FieldLabel = styled.div`
  margin-left: 0.5em;
  font-style: italic;
  font-size: ${fontSize14};
  color: grey;
`;

export const FieldClarifier = styled.div`
  margin-left: 0.5em;
  font-size: ${fontSize12};
  color: grey;
`;

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
