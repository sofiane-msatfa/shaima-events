import type { UserRepository } from "@/domain/repository/user-repository.js";
import type { RegisterRequest } from "@common/dto/register-request.js";
import type { User } from "@/domain/entity/user.js";
import type { RefreshToken } from "@/domain/entity/refresh-token.js";

import { randomId } from "@/utils/random-id.js";
import { injectable } from "inversify";
import { env } from "@/env.js";

@injectable()
export class UserMemoryRepository implements UserRepository {
  private users: User[] = [];
  private refreshTokens: RefreshToken[] = [];

  async create(user: RegisterRequest): Promise<User> {
    const newUser: User = {
      ...user,
      id: randomId(),
      deletedAt: null,
    };

    this.users.push(newUser);
    return newUser;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const targetUser = await this.findById(id);
    if (!targetUser) return null;
    await this.delete(id);
    const updatedUser = { ...targetUser, ...user };
    this.users.push(updatedUser);
    return updatedUser;
  }

  async createRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const token: RefreshToken = {
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRATION_IN_MS),
    };
    this.refreshTokens.push(token);
  }

  async findRefreshToken(userId: string, refreshToken: string): Promise<RefreshToken | null> {
    return (
      this.refreshTokens.find((token) => token.userId === userId && token.token === refreshToken) ||
      null
    );
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    this.refreshTokens = this.refreshTokens.filter((token) => token.token !== refreshToken);
  }
}
