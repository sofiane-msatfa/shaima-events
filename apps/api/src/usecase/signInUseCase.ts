import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from '../env.js';
import { UserRepository } from "@/infrastructure/database/mongo/repository/user.js";
import {  inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";

@injectable()
export class SignInUseCase {
    constructor(@inject(IDENTIFIER.UserRepository) private readonly userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<string> {
        try {
            const user = await this.userRepository.findOne({ email });
            if (!user) throw new Error("User not found");

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) throw new Error("Invalid password");

            const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

            return token;
        } catch (error) {
            throw new Error("Failed to sign in");
        }
    }
}
