import express from "express";
import cors from "cors";
import { bindDependencies } from "@/dependency/bootstrap.js";
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

  app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  }));
}
