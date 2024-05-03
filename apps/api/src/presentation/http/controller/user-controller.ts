import { inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { ResultAsync } from "neverthrow";
import { HttpCode } from "@/domain/enum/http-code.js";
import type { UserRepository } from "@/domain/repository/user-repository.js";
import type { RequestHandler, Response } from "express";
import { getUserLightFromRequest } from "@/utils/express.js";

@injectable()
export class UserController {
  @inject(IDENTIFIER.UserRepository)
  private readonly userRepository!: UserRepository;

  public getUsers: RequestHandler = async (req, res, next) => {
    const users = await ResultAsync.fromPromise(
      this.userRepository.findAll(),
      (error) => error,
    );

    if (users.isErr()) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(users.error);
    }

    res.status(HttpCode.OK).json(users.value);
    next();
  };

  public getCurrentUser: RequestHandler = async (req, res, next) => {
    const currentUser = getUserLightFromRequest(req);
    res.status(HttpCode.OK).json(currentUser);
  }
}
