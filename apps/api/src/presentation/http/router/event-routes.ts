import { Router } from "express";
import { getInstance } from "@/dependency/container.js";
import { UserController } from "../controller/user-controller.js";
import { EventController } from "../controller/event-controller.js";

// Route: /users
export function eventRouter(): Router {
  const router = Router();
  const controller = getInstance(EventController);

  router.get("/", controller.getEvents);
  router.post("/", controller.createEvent);
  
  return router;
}
