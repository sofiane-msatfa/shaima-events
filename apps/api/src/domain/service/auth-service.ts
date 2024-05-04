import type { RegisterRequest } from "@common/dto/register-request.js";
import type { AuthTokens } from "@/domain/entity/auth-tokens.js";
import type { AuthenticationError } from "../error/authentication-error.js";
import type { Result, ResultAsync } from "neverthrow";

export interface AuthService {
  login(email: string, password: string): Promise<ResultAsync<AuthTokens, AuthenticationError>>;
  register(user: RegisterRequest): Promise<ResultAsync<void, AuthenticationError>>;
  refreshAuthTokens(refreshToken: string): Promise<ResultAsync<AuthTokens, AuthenticationError>>;
  logout(refreshToken: string): Promise<void>;
}
