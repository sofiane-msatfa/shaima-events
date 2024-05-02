import type { Express } from "express";
import { RoutesConfig } from "./routes.config.js";

export function setRoutes(app: Express, routesConfig: RoutesConfig) {
    routesConfig.routes.forEach(routeConfig => {
        const { path, controller, routes } = routeConfig;

        routes.forEach(route => {
            const { method, endpoint, action, middlewares = [] } = route as { method: string; endpoint: string; action: string; middlewares: any[] };
            (app as any)[method](path + endpoint, middlewares, (controller as any)[action]);
        });
    });
}

