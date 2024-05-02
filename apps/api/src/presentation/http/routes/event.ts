// import type { Express } from "express";
// import { EventController } from "../controller/event.js";
// import { EventRepository } from "@/infrastructure/database/mongo/repository/event.js";
// import { container } from "@/dependency/container.js";
// import { IDENTIFIER } from "@/dependency/identifiers.js";
// // Injection de dépendances


// export function setEventRoutes(app: Express) {
//     const controller = container.get(EventController);

//     app.get("/events", controller.findAll);
//     app.get("/events/:id", controller.findById);
//     app.post("/events", controller.create);
//     app.patch("/events/:id", controller.update);
//     app.delete("/events/:id", controller.delete);
// }