import { StatusType } from "@/types/__generated__/graphql";
import { formatCurrency } from "@/utils/currency";
import { formatLongDate } from "@/utils/date";
import styled from "styled-components";
import { CardIcon } from "./icons/card";

const Container = styled.div`
  padding: 1em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr auto 6em;
  gap: 4em;
  align-items: center;
  background-color: peachpuff;
`;

const Title = styled.div`
  font-size: 1.5em;
`;

const DetailsContainer = styled.div`
  display: grid;
  gap: 1em;
`;

const Date = styled.div`
  color: gray;
  font-style: italic;
  font-size: 0.8em;
`;

const Info = styled.div`
  font-size: 1.25em;
  font-weight: 500;
`;

const CardNumberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StatusContainer = styled.div`
  background-color: yellow;
  border: thin solid grey;
  text-transform: uppercase;
  border-radius: 10px;
  padding: 0.25em 0.5em;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 1.5em;
`;

export const TransactionCard = ({
  title,
  status,
  date,
  cardLastFourDigits,
  amountInCents,
}: {
  title: string;
  status: StatusType;
  date: Date;
  cardLastFourDigits: string;
  amountInCents: number;
}) => {
  return (
    <Container>
      <DetailsContainer>
        <TitleContainer>
          <Title>{title}</Title>
          {status === StatusType.Pending && (
            <StatusContainer>PENDING</StatusContainer>
          )}
        </TitleContainer>
        <Date>{formatLongDate({ date })}</Date>
      </DetailsContainer>

      <CardNumberContainer>
        <CardIcon />
        <Info>{`x${cardLastFourDigits}`}</Info>
      </CardNumberContainer>

      <Info
        style={{
          textAlign: "right",
        }}
      >
        {formatCurrency(amountInCents / 100)}
      </Info>
    </Container>
  );
};
