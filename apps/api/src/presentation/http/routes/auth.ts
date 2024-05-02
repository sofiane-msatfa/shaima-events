// import type { Express } from "express";
// import { container } from "@/dependency/container.js";
// import { AuthController } from "../controller/auth.js";
// // Injection de dépendances


// export function setAuthRoutes(app: Express) {
//     const controller = container.get(AuthController);
//     const path = "/auth";

//     app.post(path, controller.signUp);
//     app.post(path + '/signin', controller.signIn);
// }