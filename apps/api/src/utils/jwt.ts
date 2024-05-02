import type { UserLight } from "@/domain/dto/user-light.js";
import { AuthenticationError } from "@/domain/error/authentication-error.js";
import jwt from "jsonwebtoken";
import { Result } from "neverthrow";

export function generateAccessToken(user: UserLight): string {
  return jwt.sign(user, "secret", {
    expiresIn: "1800s",
  });
}

export function generateRefreshToken(user: UserLight): string {
  return jwt.sign(user, "secret", {
    expiresIn: "1y",
  });
}

function handleJwtError(err: unknown): AuthenticationError {
  if (err instanceof jwt.TokenExpiredError) {
    return AuthenticationError.TokenExpired;
  }

  return AuthenticationError.Unauthorized;
}

export function verifyAccessToken(
  token: string,
): Result<UserLight, AuthenticationError> {
  return Result.fromThrowable(
    () => jwt.verify(token, "secret") as UserLight,
    (err) => handleJwtError(err),
  )();
}

export function verifyRefreshToken(
  token: string,
): Result<UserLight, AuthenticationError> {
  return Result.fromThrowable(
    () => jwt.verify(token, "secret") as UserLight,
    (err) => handleJwtError(err),
  )();
}
