import { fsPathJoin } from "@/server/lib/path";
import { objectType } from "nexus";
import { StatusType } from "./status";

export const Transaction = objectType({
  name: "Transaction",
  sourceType: {
    module: fsPathJoin("database", "transactions.ts"),
    export: "Transaction",
  },

  definition(t) {
    t.nonNull.id("id");
    t.nonNull.field("status", {
      type: StatusType,
    });
    t.nonNull.int("amountCents");
    t.nonNull.string("merchantName"), t.nonNull.string("description");
    t.nonNull.string("cardLast4Digits");
    t.nonNull.string("direction");
    t.nonNull.string("createdAt");
    t.nonNull.string("updatedAt");
  },
});
