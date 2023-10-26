import { setupDb } from "@/database/transactions";
import { IncomingMessage, ServerResponse } from "http";

export class HttpContext {
  _req: IncomingMessage;
  _res: ServerResponse;

  static async init(req: IncomingMessage, res: ServerResponse) {
    await setupDb();

    // @ts-ignore
    return new HttpContext(req, res);
  }
}
