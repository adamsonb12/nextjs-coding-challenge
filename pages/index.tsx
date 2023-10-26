import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { gql } from "@/types/__generated__";
import { StatusType } from "@/types/__generated__/graphql";
import { TransactionCard } from "@/components/TransactionCard";
import styled from "styled-components";
import {
  SearchTransactionsState,
  useSearchTransactionsReducer,
} from "@/components/search-transactions-state";
import { useDebounce } from "@/components/@common/debounce";
import { breakWidth720 } from "@/components/@common/break-points";
import { Field } from "@/components/@common/fields/field";
import { CurrencyInput } from "@/components/@common/fields/currency";
import { Select } from "@/components/@common/fields/select";
import { TextInput } from "@/components/@common/fields/text-input";

const Container = styled.div`
  padding: 1em 3em 1em 2em;
`;

const Heading1 = styled.h1`
  font-size: 2em;
  font-weight: 600;
`;

const Content = styled.section`
  display: grid;
  gap: 2em;
  margin-top: 0.5em;
`;

const Filters = styled.div`
  display: grid;
  gap: 1em;

  @media screen and (min-width: ${breakWidth720}) {
    grid-template-columns: 120px 120px 120px 120px 200px;
  }
`;

const TransactionsContainer = styled.div`
  display: grid;
  gap: 1em;
`;

const Home: NextPage = () => {
  const [state, dispatch] = useSearchTransactionsReducer();
  const debouncedState: SearchTransactionsState = useDebounce(state, 150);
  const { transactions, loading } = useTransactions({
    minAmountCents: debouncedState.minAmountCents,
    maxAmountCents: debouncedState.maxAmountCents,
    status: debouncedState.status,
    merchantName: debouncedState.merchantName,
    cardLastFourDigits: debouncedState.cardLastFourDigits,
  });

  return (
    <Container>
      <Heading1>Transactions</Heading1>
      <Content>
        <Filters>
          <Field label="Min Amount">
            <CurrencyInput
              value={state.minAmountCents ? state.minAmountCents / 100 : 0}
              onChange={(amount) =>
                dispatch({
                  type: "UPDATE_MIN_AMOUNT_CENTS",
                  payload: amount * 100,
                })
              }
            />
          </Field>
          <Field label="Max Amount">
            <CurrencyInput
              value={state.maxAmountCents ? state.maxAmountCents / 100 : 0}
              onChange={(amount) =>
                dispatch({
                  type: "UPDATE_MAX_AMOUNT_CENTS",
                  payload: amount * 100,
                })
              }
            />
          </Field>
          <Field label="Status">
            <Select
              value={state.status ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_STATUS",
                  payload: e.currentTarget.value as StatusType,
                })
              }
            >
              <option value=""></option>
              <option value={StatusType.Settled}>Settled</option>
              <option value={StatusType.Pending}>Pending</option>
            </Select>
          </Field>
          <Field label="Card">
            <TextInput
              value={state.cardLastFourDigits}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CARD_LAST_FOUR_DIGITS",
                  payload: e.currentTarget.value,
                })
              }
            />
          </Field>
          <Field label="Merchant">
            <TextInput
              value={state.merchantName}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_MERCHANT_NAME",
                  payload: e.currentTarget.value,
                })
              }
            />
          </Field>
        </Filters>
        <TransactionsContainer>
          {loading && <p>Loading...</p>}
          {transactions &&
            transactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                title={transaction.description}
                status={transaction.status}
                date={new Date(Number(transaction.createdAt))}
                cardLastFourDigits={transaction.cardLast4Digits}
                amountInCents={transaction.amountCents}
              />
            ))}
        </TransactionsContainer>
      </Content>
    </Container>
  );
};

export default Home;

const QUERY = gql(`
  query AllTransactions($minAmountCents: Int, $maxAmountCents: Int, $status: StatusType, $merchantName: String, $cardLastFourDigits: String) {
    allTransactions(minAmountCents: $minAmountCents, maxAmountCents: $maxAmountCents, status: $status, merchantName: $merchantName, cardLastFourDigits: $cardLastFourDigits) {
      id
      status
      amountCents
      merchantName
      description
      cardLast4Digits
      direction
      createdAt
      updatedAt
    }
  }
`);

const useTransactions = ({
  minAmountCents,
  maxAmountCents,
  status,
  merchantName,
  cardLastFourDigits,
}: {
  minAmountCents?: number;
  maxAmountCents?: number;
  status?: StatusType;
  merchantName?: string;
  cardLastFourDigits?: string;
}) => {
  const { data, loading } = useQuery(QUERY, {
    variables: {
      minAmountCents,
      maxAmountCents,
      status,
      merchantName,
      cardLastFourDigits,
    },
  });

  const transactions = data?.allTransactions ?? [];

  return { transactions, loading };
};
