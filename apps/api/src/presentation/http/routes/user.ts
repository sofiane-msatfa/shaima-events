    // import type { Express } from "express";
    // import { container } from "@/dependency/container.js";
    // import { UserController } from "../controller/user.js";
    // import { verifyToken } from "../middleware/auth-jwt.js";
    // // Injection de dépendances


    // export function setUserRoutes(app: Express) {
    //     const path = "/user";
    //     const controller = container.get(UserController);

    //     app.get(path, controller.findAll);
    //     app.get("/test/user", [verifyToken], controller.userBoard);
    //     app.get(`${path}/:id`, controller.findById);
    //     app.post(path, controller.create);
    //     app.patch(`${path}/:id`, controller.update);
    //     app.delete(`${path}/:id`, controller.delete);
    // }