import type { UserLight } from "@common/dto/user-light.js";
import { AuthenticationError } from "@/domain/error/authentication-error.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Result } from "neverthrow";

export function generateAccessToken(user: UserLight): string {
  const payload = { sub: JSON.stringify(user) };
  return jwt.sign(payload, "secret", {
    expiresIn: "1800s", // 30 minutes
  });
}

export function generateRefreshToken(user: UserLight): string {
  const payload = { sub: JSON.stringify(user) };
  return jwt.sign(payload, "secret", {
    expiresIn: "1y",
  });
}

function handleJwtError(err: unknown): AuthenticationError {
  if (err instanceof jwt.TokenExpiredError) {
    return AuthenticationError.TokenExpired;
  }

  return AuthenticationError.Unauthorized;
}

export function verifyAccessToken(token: string): Result<UserLight, AuthenticationError> {
  return Result.fromThrowable(
    () => {
      const { sub } = jwt.verify(token, "secret") as Required<JwtPayload>;
      return JSON.parse(sub) as UserLight;
    },
    (err) => handleJwtError(err),
  )();
}

export function verifyRefreshToken(token: string): Result<UserLight, AuthenticationError> {
  return Result.fromThrowable(
    () => {
      const { sub } = jwt.verify(token, "secret") as Required<JwtPayload>;
      return JSON.parse(sub) as UserLight;
    },
    (err) => handleJwtError(err),
  )();
}
