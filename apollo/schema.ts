import { makeSchema, connectionPlugin } from "nexus";
import { join } from "path";

import * as Query from "../server/graphql/queries";

const dirName = join(process.cwd(), "/apollo");
export const schema = makeSchema({
  types: [Query],
  contextType: {
    module: join(process.cwd(), "/server/context/index.ts"),
    export: "HttpContext",
  },
  outputs: {
    typegen: join(dirName, "nexus-typegen.ts"),
    schema: join(dirName, "schema.graphql"),
  },
  plugins: [
    connectionPlugin({
      extendConnection: {
        totalCount: { type: "Int" },
      },
    }),
  ],
});
