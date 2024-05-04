import { Router } from "express";
import { getInstance } from "@/dependency/container.js";
import { EventController } from "../controller/event-controller.js";
import { isAuthenticated } from "../middleware/auth.js";

// Route: /events
export function eventRouter(): Router {
  const router = Router();
  const controller = getInstance(EventController);

  router.get("/", controller.getEvents);
  router.post("/", isAuthenticated, controller.createEvent);
  router.get("/me", isAuthenticated, controller.getAllForCurrentUser);
  router.get("/:id", isAuthenticated, controller.getEvent);
  router.delete("/:id", isAuthenticated, controller.deleteEvent);
  router.patch("/:id", isAuthenticated, controller.updateEvent);

  return router;
}
