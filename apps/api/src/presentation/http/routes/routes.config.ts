import { container } from "@/dependency/container.js";
import { UserController } from "../controller/user.js";
import { EventController } from "../controller/event.js";
import { injectable } from "inversify";
import { verifyToken } from "../middleware/auth-jwt.js";
import { AuthController } from "../controller/auth.js";
import { VerifySignUp } from "../middleware/verify-sign-up.js";


type ControllerType = typeof EventController | typeof UserController | typeof AuthController;

type EventControllerRoutes = {
    method: string,
    endpoint: string,
    action: keyof EventController,
    middlewares?: Function[]
}[];

type UserControllerRoutes = {
    method: string,
    endpoint: string,
    action: keyof UserController,
    middlewares?: Function[]
}[];

type AuthControllerRoutes = {
    method: string,
    endpoint: string,
    action: keyof AuthController,
    middlewares?: Function[]
}[];

@injectable()
export class RoutesConfig {
    routes: {
        path: string,
        controller: InstanceType<ControllerType>,
        routes: EventControllerRoutes | UserControllerRoutes | AuthControllerRoutes
    }[];

    constructor() {
        this.routes = [
            {
                path: "/events",
                controller: container.get<EventController>(EventController),
                routes: [
                    { method: "get", endpoint: "/", action: "findAll", middlewares: [verifyToken] },
                    { method: "get", endpoint: "/:id", action: "findById", middlewares: [verifyToken] },
                    { method: "post", endpoint: "/", action: "create", middlewares: [verifyToken] },
                    { method: "patch", endpoint: "/:id", action: "update", middlewares: [verifyToken] },
                    { method: "delete", endpoint: "/:id", action: "delete", middlewares: [verifyToken] },
                ] as EventControllerRoutes
            },
            {
                path: "/user",
                controller: container.get<UserController>(UserController),
                routes: [
                    { method: "get", endpoint: "/", action: "findAll", middlewares: [verifyToken] },
                    { method: "get", endpoint: "/:id", action: "findById", middlewares: [verifyToken] },
                    { method: "post", endpoint: "/", action: "create", middlewares: [verifyToken] },
                    { method: "patch", endpoint: "/:id", action: "update", middlewares: [verifyToken] },
                    { method: "delete", endpoint: "/:id", action: "delete", middlewares: [verifyToken] },
                    { method: "get", endpoint: "/test/user", action: "userBoard", middlewares: [verifyToken] },
                ] as UserControllerRoutes
            },
            {
                path: "/auth",
                controller: container.get<AuthController>(AuthController),
                routes: [
                    { method: "post", endpoint: "/signin", action: "signIn" },
                    { method: "post", endpoint: "/signup", action: "signUp", middlewares: [container.get(VerifySignUp).checkDuplicateUsernameOrEmail] }
                ] as AuthControllerRoutes
            }
        ];
    }
}