import { LIGHT_USER } from "@/constants.js";
import type { UserLight } from "@common/dto/user-light.js";
import type { RequestHandler, Request } from "express";

export function asyncHandler(handler: RequestHandler): RequestHandler {
  return (req, res, next) => {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function getUserLightFromRequest(request: Request): UserLight {
  const serializedUser = request.headers[LIGHT_USER] as string;
  return JSON.parse(serializedUser);
}
