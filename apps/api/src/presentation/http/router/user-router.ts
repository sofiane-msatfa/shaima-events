import { Router } from "express";
import { getInstance } from "@/dependency/container.js";
import { UserController } from "../controller/user-controller.js";
import { isAuthenticated } from "../middleware/auth.js";

// Route: /users
export function userRouter(): Router {
  const router = Router();
  const controller = getInstance(UserController);

  router.get("/", controller.getUsers);
  router.get("/me", isAuthenticated, controller.getCurrentUser);

  return router;
}
