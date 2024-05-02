import bcrypt from "bcrypt";
import { UserModel } from "@/infrastructure/database/mongo/model/user.js";
import { UserRepository } from "@/infrastructure/database/mongo/repository/user.js";
import { inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";

@injectable()
export class SignUpUseCase {
    constructor(@inject(IDENTIFIER.UserRepository) private readonly userRepository: UserRepository) {}

    async execute(username: string, email: string, password: string, roles: string[] = ['ROLE_USER']): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                roles,
            });
            await this.userRepository.create(newUser);
        } catch (error) {
            throw new Error("Failed to register user");
        }
    }
}
