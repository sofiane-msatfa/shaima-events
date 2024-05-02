import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { userZodSchema, type UserDocument } from "@/infrastructure/database/mongo/model/user.js";
import { ZodError } from "zod";
import type { SignUpUseCase } from "@/usecase/signUpUseCase.js";
import type { SignInUseCase } from "@/usecase/signInUseCase.js";

@injectable()
export class AuthController {
    constructor(
        @inject(IDENTIFIER.SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
        @inject(IDENTIFIER.SignInUseCase) private readonly signInUseCase: SignInUseCase
    ) { }

    signUp = async (req: Request, res: Response) => {
        try {

            const { username, email, password, roles } = userZodSchema.parse(req.body);

            if (!email || !password) return res.status(400).send({ message: "Invalid request" });

            await this.signUpUseCase.execute(username ? username : '', email, password, roles);

            res.status(201).send({ message: "User registered successfully!" });

        } catch (error) {

            if (error instanceof ZodError) {

                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))

                res.status(400).json({ error: 'Invalid data', details: errorMessages });

            } else {
                console.error(error);
                res.status(500).send({ message: "Internal server error" });
            }
        }
    };

    signIn = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const token = await this.signInUseCase.execute(email, password);

            res.cookie('jwt_token', token, { httpOnly: true });

            res.status(200).send({ accessToken: token });
        } catch (error) {
            console.error(error);
            res.status(401).send({ message: "Invalid credentials" });
        }
    }


}
