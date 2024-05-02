import type { Express, ErrorRequestHandler } from "express";
import { HttpCode } from "@/domain/enum/http-code.js";

import { userRouter } from "./user-router.js";
import { authRouter } from "./auth-router.js";

export function registerEndpoints(app: Express): void {
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
  });

  // routes

  app.use("/users", userRouter());
  app.use("/auth", authRouter());

  app.use(errorHandler);
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
};
