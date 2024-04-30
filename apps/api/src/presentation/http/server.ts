import { createExpressApp } from "./app.js";
import * as http from "node:http2";

export async function createServer(): Promise<http.Http2Server> {
  const app = await createExpressApp();
  const server = http.createServer(app);
  return server;
}
