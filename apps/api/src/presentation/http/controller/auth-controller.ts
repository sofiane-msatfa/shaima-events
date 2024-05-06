import type { RequestHandler, Response } from "express";
import type { AuthService } from "@/domain/service/auth-service.js";

import { inject, injectable } from "inversify";
import { env } from "@/env.js";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { loginRequestSchema } from "@common/dto/login-request.js";
import { registerRequestSchema } from "@common/dto/register-request.js";
import { HttpCode } from "@/domain/enum/http-code.js";
import { AuthenticationError } from "@/domain/error/authentication-error.js";
import { asyncHandler } from "@/utils/express.js";
import { assert } from "@/utils/validation.js";

@injectable()
export class AuthController {
  @inject(IDENTIFIER.AuthService)
  private readonly authService!: AuthService;

  public login: RequestHandler = asyncHandler(async (req, res, next) => {
    const credentials = assert(req.body, loginRequestSchema);

    if (credentials.isErr()) {
      return res.status(HttpCode.BAD_REQUEST).json(credentials.error);
    }

    const { email, password } = credentials.value;

    const authPayload = await this.authService.login(email, password);

    if (authPayload.isErr()) {
      this.handleAuthenticationError(authPayload.error, res);
      return next();
    }

    const { accessToken, refreshToken } = authPayload.value;

    this.setRefreshTokenCookie(res, refreshToken);
    res.status(HttpCode.OK).json({ accessToken });
  });

  public register: RequestHandler = asyncHandler(async (req, res, next) => {
    const credentials = assert(req.body, registerRequestSchema);

    if (credentials.isErr()) {
      return res.status(HttpCode.BAD_REQUEST).json(credentials.error);
    }

    const authPayload = await this.authService.register(credentials.value);

    if (authPayload.isErr()) {
      this.handleAuthenticationError(authPayload.error, res);
      return next();
    }

    res.status(HttpCode.CREATED).send("User created");
  });

  public refreshTokens: RequestHandler = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(HttpCode.BAD_REQUEST).send("Refresh token not found");
    }

    const authPayload = await this.authService.refreshAuthTokens(refreshToken);

    if (authPayload.isErr()) {
      this.handleAuthenticationError(authPayload.error, res);
      return next();
    }

    const { accessToken, refreshToken: newRefreshToken } = authPayload.value;

    this.setRefreshTokenCookie(res, newRefreshToken);
    res.status(HttpCode.OK).json({ accessToken });
  });

  public logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(HttpCode.BAD_REQUEST).send("Refresh token not found");
    }

    await this.authService.logout(refreshToken);

    res.clearCookie("refreshToken");
    res.status(HttpCode.OK).send("Logged out");
  });

  private setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: env.REFRESH_TOKEN_EXPIRATION_IN_MS,
    });
  };

  private handleAuthenticationError = (error: AuthenticationError, res: Response): Response => {
    switch (error) {
      case AuthenticationError.EmailAlreadyExists:
      case AuthenticationError.AuthorizationNotFound:
      case AuthenticationError.Unauthorized:
      case AuthenticationError.UserNotFound:
      case AuthenticationError.InvalidRefreshToken:
        // avoid leaking information about existing users
        // alternative: captcha on the frontend
        return res.status(HttpCode.UNAUTHORIZED).send("Unauthorized");
      case AuthenticationError.UnsupportedIdentifier:
        return res.status(HttpCode.BAD_REQUEST).send("Unsupported identifier");
      case AuthenticationError.UserCreationFailed:
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send("User creation failed");
      case AuthenticationError.TokenExpired:
        return res.status(HttpCode.UNAUTHORIZED).send("TokenExpired");
    }
  };
}
