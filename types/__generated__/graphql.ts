/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  allTransactions?: Maybe<Array<Transaction>>;
  getTransaction?: Maybe<Transaction>;
};


export type QueryAllTransactionsArgs = {
  cardLastFourDigits?: InputMaybe<Scalars['String']['input']>;
  maxAmountCents?: InputMaybe<Scalars['Int']['input']>;
  merchantName?: InputMaybe<Scalars['String']['input']>;
  minAmountCents?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<StatusType>;
};


export type QueryGetTransactionArgs = {
  id: Scalars['ID']['input'];
};

export enum StatusType {
  Pending = 'pending',
  Settled = 'settled'
}

export type Transaction = {
  __typename?: 'Transaction';
  amountCents: Scalars['Int']['output'];
  cardLast4Digits: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  direction: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  merchantName: Scalars['String']['output'];
  status: StatusType;
  updatedAt: Scalars['String']['output'];
};

export type AllTransactionsQueryVariables = Exact<{
  minAmountCents?: InputMaybe<Scalars['Int']['input']>;
  maxAmountCents?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<StatusType>;
  merchantName?: InputMaybe<Scalars['String']['input']>;
  cardLastFourDigits?: InputMaybe<Scalars['String']['input']>;
}>;


export type AllTransactionsQuery = { __typename?: 'Query', allTransactions?: Array<{ __typename?: 'Transaction', id: string, status: StatusType, amountCents: number, merchantName: string, description: string, cardLast4Digits: string, direction: string, createdAt: string, updatedAt: string }> | null };


export const AllTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minAmountCents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAmountCents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StatusType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merchantName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cardLastFourDigits"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"minAmountCents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minAmountCents"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxAmountCents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAmountCents"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"merchantName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merchantName"}}},{"kind":"Argument","name":{"kind":"Name","value":"cardLastFourDigits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cardLastFourDigits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amountCents"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cardLast4Digits"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AllTransactionsQuery, AllTransactionsQueryVariables>;