import type { RequestHandler } from "express";
import { HttpCode } from "@/domain/enum/http-code.js";
import { AuthenticationError } from "@/domain/error/authentication-error.js";
import { verifyAccessToken } from "@/utils/jwt.js";
import { LIGHT_USER } from "@/constants.js";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const identifier = "Bearer ";
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(HttpCode.UNAUTHORIZED).send(AuthenticationError.AuthorizationNotFound);
  }

  if (!authorization.startsWith(identifier)) {
    return res.status(HttpCode.UNAUTHORIZED).send(AuthenticationError.UnsupportedIdentifier);
  }

  const token = authorization.slice(identifier.length);
  const result = verifyAccessToken(token);

  if (result.isErr()) {
    return res.status(HttpCode.UNAUTHORIZED).send(result.error);
  }

  req.headers[LIGHT_USER] = JSON.stringify(result.value);

  return next();
};
