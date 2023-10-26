import { idArg, nonNull, queryField } from "nexus";
import { Transaction } from "../types/transaction";
import { findTransactionById } from "@/database/transactions";

export const getTransaction = queryField("getTransaction", {
  type: Transaction,

  args: {
    id: nonNull(idArg()),
  },

  async resolve(_root, args) {
    return await findTransactionById(args.id);
  },
});
