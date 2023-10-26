"use client";

import { getDecimalPart, getGroupingSeparator } from "@/utils/number";

interface MaskedValueAfterValueUpdateParams {
  formattedValue: string;
  locale?: string;
  maskedValue: string;
  value: number;
}

export const getMaskedValueAfterValueUpdate = ({
  formattedValue,
  maskedValue,
  locale = "en-US",
  value,
}: MaskedValueAfterValueUpdateParams) => {
  const decimalPointCharacter = getDecimalPart({ locale });
  if (
    !value &&
    maskedValue &&
    ![decimalPointCharacter, "-", `-${decimalPointCharacter}`, "0"].includes(
      maskedValue
    )
  ) {
    return "";
  } else if (value && (!maskedValue || maskedValue === "0")) {
    const newMask = formattedValue;
    if (newMask !== maskedValue) {
      return newMask;
    }
  } else if (
    value &&
    maskedValue &&
    formattedValue !== maskedValue &&
    maskedValue !== "0" &&
    ![decimalPointCharacter].includes(maskedValue[maskedValue.length - 1]) &&
    !(
      maskedValue.includes(decimalPointCharacter) &&
      maskedValue.split(decimalPointCharacter)[
        maskedValue.split(decimalPointCharacter).length - 1
      ] === "0"
    )
  ) {
    return formattedValue;
  }

  return maskedValue;
};

interface NumberFromMaskedValueParams {
  maskedValue: string;
  locale?: string;
}

export const getNumberFromMaskedValue = ({
  maskedValue,
  locale = "en-US",
}: NumberFromMaskedValueParams) => {
  const groupingSeparator = getGroupingSeparator({ locale });
  const maskedValueWithoutGroupingSeparator = maskedValue.replace(
    new RegExp(`${groupingSeparator}`, "g"),
    ""
  );
  return maskedValueWithoutGroupingSeparator === ""
    ? undefined
    : Number(maskedValueWithoutGroupingSeparator);
};

interface InsertGroupingSeparatorParams {
  value: string;
  decimalPlaces?: number;
  locale?: string;
  noNegativeNumbers?: boolean;
}

export const insertGroupingSeparators = ({
  value,
  decimalPlaces = 2,
  locale = "en-US",
  noNegativeNumbers,
}: InsertGroupingSeparatorParams) => {
  const groupingSeparator = getGroupingSeparator({ locale });
  const decimal = getDecimalPart({ locale });

  const isNegative = value.replace(/[^-]/g, "")?.length % 2 === 1;

  // removes all invalid number characters, including existing grouping separators
  const invalidCharacters = new RegExp(`[^0-9${decimal}]`, "g");

  let newValue = value.split(decimal || "")[0];
  newValue = newValue
    .replace(invalidCharacters, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, groupingSeparator || "");

  if (decimal && value.includes(decimal) && decimalPlaces > 0) {
    let decimals = value.split(decimal)[1];
    if (decimals.length > decimalPlaces) {
      decimals = decimals.substring(0, decimalPlaces);
    }
    return `${newValue}${decimal}${decimals}`;
  }

  return `${isNegative && !noNegativeNumbers ? "-" : ""}${newValue}`;
};
