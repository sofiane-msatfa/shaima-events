import { bindDependencies } from "@/dependency/bootstrap.js";
import express from "express";

export async function createExpressApp(): Promise<express.Application> {
  const app = express();

  //   if (!!process.env.ENABLE_SWAGGER) {
  //   }

  bindDependencies();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.disable("x-powered-by");

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/version", (req, res) => {
    res.json({ version: "1.0.0" });
  })

  app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
  });

  app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  return app;
}
