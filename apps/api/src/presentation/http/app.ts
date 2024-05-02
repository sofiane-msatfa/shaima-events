import { bindDependencies } from "@/dependency/bootstrap.js";
import express from "express";
import { registerEndpoints } from "./router/index.js";

export async function createExpressApp(): Promise<express.Express> {
  const app = express();

  //   if (!!process.env.ENABLE_SWAGGER) {
  //   }

  bindDependencies();

  expressConfigMiddleware(app)
  registerEndpoints(app);

  return app;
}

function expressConfigMiddleware(app: express.Express): void {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.disable("x-powered-by");
}
