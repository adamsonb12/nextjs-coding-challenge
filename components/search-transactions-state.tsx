import { StatusType } from "@/types/__generated__/graphql";
import { useReducer } from "react";

export type Maybe<T> = NonNullable<T> | undefined;

// STATE
export interface SearchTransactionsState {
  minAmountCents: Maybe<number>;
  maxAmountCents: Maybe<number>;
  status: Maybe<StatusType.Pending | StatusType.Settled>;
  merchantName: Maybe<string>;
  cardLastFourDigits: Maybe<string>;
}

export const defaultSearchTransactionState = {
  minAmountCents: undefined,
  maxAmountCents: undefined,
  status: undefined,
  merchantName: undefined,
  cardLastFourDigits: undefined,
};

// Actions
interface UpdateMinAmountCents {
  type: "UPDATE_MIN_AMOUNT_CENTS";
  payload: Maybe<number>;
}

interface UpdateMaxAmountCents {
  type: "UPDATE_MAX_AMOUNT_CENTS";
  payload: Maybe<number>;
}

interface UpdateStatus {
  type: "UPDATE_STATUS";
  payload: Maybe<StatusType.Pending | StatusType.Settled>;
}

interface UpdateMerchantName {
  type: "UPDATE_MERCHANT_NAME";
  payload: Maybe<string>;
}

interface UpdateCardLastFourDigits {
  type: "UPDATE_CARD_LAST_FOUR_DIGITS";
  payload: Maybe<string>;
}

type SearchTransactionStateAction =
  | UpdateMinAmountCents
  | UpdateMaxAmountCents
  | UpdateStatus
  | UpdateMerchantName
  | UpdateCardLastFourDigits;

// Reducers
const SearchTransactionsReducer = (
  prevState: SearchTransactionsState,
  action: SearchTransactionStateAction
): SearchTransactionsState => {
  switch (action.type) {
    case "UPDATE_MIN_AMOUNT_CENTS":
      return { ...prevState, minAmountCents: action.payload };
    case "UPDATE_MAX_AMOUNT_CENTS":
      return { ...prevState, maxAmountCents: action.payload };
    case "UPDATE_STATUS":
      return { ...prevState, status: action.payload };
    case "UPDATE_MERCHANT_NAME":
      return { ...prevState, merchantName: action.payload };
    case "UPDATE_CARD_LAST_FOUR_DIGITS":
      return { ...prevState, cardLastFourDigits: action.payload };
    default:
      return { ...prevState };
  }
};

export const useSearchTransactionsReducer = (
  defaults?: SearchTransactionsState
) => {
  return useReducer(SearchTransactionsReducer, {
    ...defaultSearchTransactionState,
    ...defaults,
  });
};
