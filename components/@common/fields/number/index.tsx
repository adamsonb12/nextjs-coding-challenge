"use client";

import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { TextInput } from "../text-input";

import {
  getMaskedValueAfterValueUpdate,
  getNumberFromMaskedValue,
  insertGroupingSeparators,
} from "./utils";
import {
  formatNumber,
  getDecimalPart,
  getNumberOfDecimalPlaces,
} from "@/utils/number";

type Input = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  onChange?: (v: number) => void;
  value?: number;
};

export interface NumberFieldProps extends Input {
  onChange?: (v: number | undefined) => void;
  value?: number;
  maxDecimalPlaces?: number;
  noNegativeNumbers?: boolean;
}

const NumberField = ({
  onChange,
  value,
  maxDecimalPlaces = 2,
  noNegativeNumbers = false,
  ...props
}: NumberFieldProps) => {
  let decimalPlaces = getNumberOfDecimalPlaces({ number: value ?? 0 });
  if (decimalPlaces > maxDecimalPlaces) {
    decimalPlaces = maxDecimalPlaces;
  }
  const [maskedValue, setMaskedValue] = useState(
    value || value === 0
      ? formatNumber({ amount: value, decimalPlaces }) ?? String(value)
      : ""
  );

  const [previousInput, updatePreviousInput] = useState("");
  const [cursorPosition, updateCursorPosition] = useState(0);
  const inputElement = useRef<HTMLInputElement>(null);

  const decimalPointCharacter = getDecimalPart();

  const checkCursorPosition = () => {
    // Updates the cursor position if necessary
    if (previousInput) {
      if (previousInput.length === 1 && maskedValue.length > 1) {
        let newCursorPosition = maskedValue.indexOf(previousInput);
        if (newCursorPosition < maskedValue.length) {
          newCursorPosition += 1;
        }
        inputElement?.current?.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      } else if (
        previousInput.indexOf(decimalPointCharacter) !==
          previousInput.lastIndexOf(decimalPointCharacter) &&
        maskedValue.includes(decimalPointCharacter)
      ) {
        inputElement?.current?.setSelectionRange(
          maskedValue.indexOf(decimalPointCharacter) + 1,
          maskedValue.indexOf(decimalPointCharacter) + 1
        );
      } else if (
        previousInput.includes(decimalPointCharacter) &&
        cursorPosition === previousInput.indexOf(decimalPointCharacter) + 2 &&
        previousInput.split(decimalPointCharacter)[1].length > maxDecimalPlaces
      ) {
        inputElement?.current?.setSelectionRange(
          maskedValue.indexOf(decimalPointCharacter) + 2,
          maskedValue.indexOf(decimalPointCharacter) + 2
        );
      } else {
        const diff = maskedValue.length - (previousInput.length || 0);
        const newCursorPosition =
          cursorPosition + diff >= 0 ? cursorPosition + diff : 0;
        inputElement?.current?.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      }
    }
  };

  const updateMaskedValueIfValueHasUpdatedExternally = () => {
    // Updates Masked Value if Value was changed and they don't match
    const formattedValue =
      formatNumber({ amount: value ?? 0, decimalPlaces }) ?? String(value);
    const newMaskedValue = getMaskedValueAfterValueUpdate({
      formattedValue,
      maskedValue,
      value: value ?? 0,
    });
    if (
      newMaskedValue !== maskedValue &&
      maskedValue !== `${decimalPointCharacter}0`
    ) {
      setMaskedValue(newMaskedValue);
    }
  };

  useEffect(() => {
    checkCursorPosition();
    updateMaskedValueIfValueHasUpdatedExternally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, previousInput]);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    if (
      // if the user hasn't entered a second decimal point
      inputValue.indexOf(decimalPointCharacter) ===
      inputValue.lastIndexOf(decimalPointCharacter)
    ) {
      const cursorPosition = event.currentTarget.selectionStart;
      updatePreviousInput(inputValue);
      updateCursorPosition(cursorPosition);
      const newMaskedValue = insertGroupingSeparators({
        value: inputValue,
        decimalPlaces: maxDecimalPlaces,
        noNegativeNumbers,
      });

      setMaskedValue(newMaskedValue);
      const newValue = getNumberFromMaskedValue({
        maskedValue: newMaskedValue,
      });
      if (
        (newValue || newValue === 0) &&
        newValue !== value &&
        !isNaN(newValue)
      ) {
        onChange?.(noNegativeNumbers ? Math.abs(newValue) : newValue);
      } else if (newValue === undefined && newValue !== value) {
        onChange?.(newValue);
      }
    }
  };

  return (
    <TextInput
      value={maskedValue}
      onChange={(e: any) => handleChange(e)}
      ref={inputElement}
      {...props}
      type="text"
    />
  );
};

export const NumberInput = styled(NumberField)`
  text-align: right;
`;
