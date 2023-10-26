import { enumType } from "nexus";

export const StatusType = enumType({
  name: "StatusType",
  members: ["settled", "pending"],
});
