import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { gql } from "@/types/__generated__";
import { StatusType } from "@/types/__generated__/graphql";
import { TransactionCard } from "@/components/TransactionCard";
import styled from "styled-components";

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

const Filters = styled.div``;

const TransactionsContainer = styled.div`
  display: grid;
  gap: 1em;
`;

const Home: NextPage = () => {
  const { transactions, loading } = useTransactions({});

  return (
    <Container>
      <Heading1>Transactions</Heading1>
      <Content>
        <Filters>filters</Filters>
        <TransactionsContainer>
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
