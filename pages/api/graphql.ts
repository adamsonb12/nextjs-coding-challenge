import { schema } from "@/apollo/schema";
import { HttpContext } from "@/server/context";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({
  schema: schema,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => await HttpContext.init(req, res),
});

export default handler;
