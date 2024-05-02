import "reflect-metadata";
import express from "express";
import { database } from "@/infrastructure/database/mongo/database.js";
import { bindDependencies } from "@/dependency/bootstrap.js";
import cors from 'cors'
import { RoutesConfig } from "./routes/routes.config.js";
import { setRoutes } from "./routes/routes.js";
import cookieParser from 'cookie-parser';



export async function createExpressApp(): Promise<express.Application> {

  await database;

  const app = express();


  //   if (!!process.env.ENABLE_SWAGGER) {
  //   }

  bindDependencies()

  app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowedHeaders: ["x-access-token", "Origin", "Content-Type", "Accept"]
  }));

  app.use(cookieParser());
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

  const routesConfig = new RoutesConfig();
  setRoutes(app, routesConfig);

  app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
    return;
  });


  return app;
}
