import { IDENTIFIER } from "@/dependency/identifiers.js";
import { UserRepository } from "@/infrastructure/database/mongo/repository/user.js";
import type { Request, Response, NextFunction } from "express";
import e from "express";
import { inject, injectable } from "inversify";

@injectable()
export class VerifySignUp {
    constructor(@inject(IDENTIFIER.UserRepository) private readonly repository: UserRepository) {
    }

    checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const emailUser = await this.repository.findOne({ email: req.body.email });

            if (emailUser) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }

            next();

        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal server error" });
        }
    };
}
