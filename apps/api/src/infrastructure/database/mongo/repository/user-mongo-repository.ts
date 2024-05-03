import type { RegisterRequest } from "@/domain/dto/register-request.js";
import type { User } from "@/domain/entity/user.js";
import type { UserRepository } from "@/domain/repository/user-repository.js";
import UserModel from "../model/user.js";
import RefreshTokenModel from "../model/refresh-token.js";
import { injectable } from "inversify";
import { env } from "@/env.js";
import type { RefreshToken } from "@/domain/entity/refresh-token.js";

@injectable()
export class UserMongoRepository implements UserRepository {
  async create(user: RegisterRequest): Promise<User> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON();
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return user.toJSON();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return user.toJSON();
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map((user) => user.toJSON());
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!updatedUser) return null;
    return updatedUser.toJSON();
  }

  async findRefreshToken(userId: string, refreshToken: string): Promise<RefreshToken | null> {
    const token = await RefreshTokenModel.findOne({ userId, token: refreshToken });
    if (!token) return null;
    return token.toJSON();
  }

  async createRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await RefreshTokenModel.create({
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRATION_IN_MS),
    });
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    await RefreshTokenModel.findOneAndDelete({ token: refreshToken });
  }
}
