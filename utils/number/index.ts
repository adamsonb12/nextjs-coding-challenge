"use client";

interface NumberFormatParams {
  amount: number;
  locale?: string;
  decimalPlaces?: number;
  minumumDecimalPlaces?: number;
}

export const formatNumber = ({
  amount,
  locale = "en-US",
  decimalPlaces = 2,
  minumumDecimalPlaces = 0,
}: NumberFormatParams) => {
  if (!Number.isFinite(Number(amount))) {
    return null;
  }

  const newNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: minumumDecimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
  return newNumber;
};

interface NumberOfDecimalPlacesParams {
  number: number;
  decimalPoint?: string;
}

export const getNumberOfDecimalPlaces = ({
  number,
  decimalPoint = ".",
}: NumberOfDecimalPlacesParams) => {
  const stringNumber = String(number);
  if (stringNumber.includes(decimalPoint)) {
    return stringNumber.split(decimalPoint)[1].length;
  }

  return 0;
};

interface GetDecimalPartParams {
  locale?: string;
}

export const getDecimalPart = ({
  locale = "en-US",
}: GetDecimalPartParams = {}) => {
  const number = 1.1;
  return (
    Intl.NumberFormat(locale)
      .formatToParts(number)
      .find((part) => part.type === "decimal")?.value || ""
  );
};

export const getGroupingSeparator = ({ locale }: GetDecimalPartParams = {}) => {
  const number = 1112;
  return Intl.NumberFormat(locale)
    .formatToParts(number)
    .find((part) => part.type === "group")?.value;
};

interface NumberFormatterParams {
  amount: number;
  locale?: string;
  currencyCode?: string;
  disableDecimalPlaces?: boolean;
}

export const formatNumberAbbreviated = ({
  amount,
  locale = "en-US",
}: Omit<NumberFormatterParams, "disableDecimalPlaces" | "currencyCode">) => {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  if (Math.abs(amount) >= 1_000_000_000_000) {
    return (
      new Intl.NumberFormat(locale, {
        ...options,
        maximumSignificantDigits: 5,
      }).format(amount / 1_000_000_000_000) + "T"
    );
  }

  if (Math.abs(amount) >= 1_000_000_000) {
    return (
      new Intl.NumberFormat(locale, {
        ...options,
        maximumSignificantDigits: 4,
      }).format(amount / 1_000_000_000) + "B"
    );
  }

  if (Math.abs(amount) >= 1_000_000) {
    return (
      new Intl.NumberFormat(locale, {
        ...options,
        maximumSignificantDigits: 3,
      }).format(amount / 1_000_000) + "M"
    );
  }

  if (Math.abs(amount) >= 1_000) {
    return (
      new Intl.NumberFormat(locale, {
        ...options,
        maximumSignificantDigits: 2,
      }).format(amount / 1_000) + "K"
    );
  }

  return new Intl.NumberFormat(locale, {
    ...options,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const randomNumberWithinRange = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
