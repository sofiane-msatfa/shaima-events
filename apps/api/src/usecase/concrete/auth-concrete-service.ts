import type { AuthTokens } from "@/domain/entity/auth-tokens.js";
import type { RegisterRequest } from "@common/dto/register-request.js";
import type { UserLight } from "@common/dto/user-light.js";
import type { User } from "@/domain/entity/user.js";
import type { UserRepository } from "@/domain/repository/user-repository.js";
import type { AuthService } from "@/domain/service/auth-service.js";

import argon2 from "argon2";
import { inject, injectable } from "inversify";
import { performance } from "node:perf_hooks";
import { ResultAsync, errAsync, okAsync } from "neverthrow";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { AuthenticationError } from "@/domain/error/authentication-error.js";
import { stall } from "@/utils/stall.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils/jwt.js";

@injectable()
export class AuthConcreteService implements AuthService {
  @inject(IDENTIFIER.UserRepository)
  private readonly userRepository!: UserRepository;

  async login(
    email: string,
    password: string,
  ): Promise<ResultAsync<AuthTokens, AuthenticationError>> {
    const timeStart = performance.now();
    const stallTime = 1000;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      await stall(stallTime, timeStart);
      return errAsync(AuthenticationError.UserNotFound);
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      await stall(stallTime, timeStart);
      return errAsync(AuthenticationError.Unauthorized);
    }

    const userLight = this.toUserLight(user);
    const authtokens = await this.generateAuthTokens(userLight);

    await stall(stallTime, timeStart);
    return okAsync(authtokens);
  }

  async register(user: RegisterRequest): Promise<ResultAsync<void, AuthenticationError>> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      return errAsync(AuthenticationError.EmailAlreadyExists);
    }

    const hashedPassword = await argon2.hash(user.password);
    const userToCreate = { ...user, password: hashedPassword };

    const creationResult = await ResultAsync.fromPromise(
      this.userRepository.create(userToCreate),
      (error) => error,
    );

    if (creationResult.isErr()) {
      console.error(creationResult.error);
      return errAsync(AuthenticationError.UserCreationFailed);
    }

    return okAsync(void 0);
  }

  async refreshAuthTokens(
    refreshToken: string,
  ): Promise<ResultAsync<AuthTokens, AuthenticationError>> {
    const result = verifyRefreshToken(refreshToken);

    if (result.isErr()) {
      if (result.error === AuthenticationError.TokenExpired) {
        await this.userRepository.deleteRefreshToken(refreshToken);
      }
      return errAsync(result.error);
    }

    const userLight = result.value;

    const storedToken = await this.userRepository.findRefreshToken(userLight.id, refreshToken);

    if (!storedToken) {
      return errAsync(AuthenticationError.InvalidRefreshToken);
    }

    const authTokens = await this.generateAuthTokens(userLight);

    return okAsync(authTokens);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.userRepository.deleteRefreshToken(refreshToken);
  }

  private async generateAuthTokens(user: UserLight): Promise<AuthTokens> {
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);
    await this.userRepository.createRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private toUserLight(user: User): UserLight {
    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      deletedAt: user.deletedAt,
    };
  }
}
