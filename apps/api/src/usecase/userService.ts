import { inject, injectable } from "inversify";
import { UserRepository } from "@/infrastructure/database/mongo/repository/user.js";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import type { UserDocument } from "@/infrastructure/database/mongo/model/user.js";

@injectable()
export class UserService {
    constructor(@inject(IDENTIFIER.UserRepository) private readonly userRepository: UserRepository) { }

    findAllUsers = async (): Promise<UserDocument[]> => {
        return this.userRepository.findAll({});
    }

    findUserById = async (id: string): Promise<UserDocument | null> => {
        return this.userRepository.findById(id);
    }

    createUser = async (userData: any): Promise<UserDocument> => {
        return this.userRepository.create(userData);
    }

    updateUser = async (id: string, userData: any): Promise<void> => {
        await this.userRepository.update(id, userData);
    }

    deleteUser = async (id: string): Promise<void> => {
        await this.userRepository.delete(id);
    }

}