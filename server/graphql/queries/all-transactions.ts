import { intArg, queryField, stringArg } from "nexus";
import { Transaction } from "../types/transaction";
import { StatusType } from "../types/status";
import { searchTransactions } from "@/database/transactions";

export const allTransactions = queryField((t) => {
  t.list.nonNull.field("allTransactions", {
    type: Transaction,
    args: {
      minAmountCents: intArg(),
      maxAmountCents: intArg(),
      status: StatusType,
      merchantName: stringArg(),
      cardLastFourDigits: stringArg(),
    },
    async resolve(root, args) {
      const {
        minAmountCents,
        maxAmountCents,
        status,
        merchantName,
        cardLastFourDigits,
      } = args;

      return await searchTransactions({
        minAmountCents,
        maxAmountCents,
        status,
        merchantName,
        cardLastFourDigits,
      });
    },
  });
});
