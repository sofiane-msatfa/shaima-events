import { Router } from "express";
import { getInstance } from "@/dependency/container.js";
import { UserController } from "../controller/user-controller.js";
import { EventController } from "../controller/event-controller.js";
import { isAuthenticated } from "../middleware/auth.js";

// Route: /users
export function eventRouter(): Router {
  const router = Router();
  const controller = getInstance(EventController);

  router.get("/", controller.getEvents);
  router.post("/", isAuthenticated, controller.createEvent);
  router.delete("/:id", isAuthenticated, controller.deleteEvent);
  
  return router;
}
