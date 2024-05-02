import { IDENTIFIER } from "@/dependency/identifiers.js";
import type { UserRepository } from "@/infrastructure/database/mongo/repository/user.js";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";

/**
 * Explication différence entre fonction flécher et fonction classique par rapport au 'this'
 */

@injectable()
export class UserController {

    constructor(@inject(IDENTIFIER.UserRepository) private readonly repository: UserRepository) {
    }

    findAll = async (req: Request, res: Response) => {
        const events = await this.repository.findAll({});
        res.json(events);
    }

    findById = async (req: Request, res: Response) => {
        const id = req.params.id!;
        const event = await this.repository.findById(id);
        res.json(event);
    }

    create = async (req: Request, res: Response) => {
        const event = req.body;
        this.repository.create(event);
        res.json(event);
    }

    update = async (req: Request, res: Response) => {
        const id = req.params.id;
        const event = req.body;

        if (!id) {
            res.status(400).json({ message: "Id is required" });
            return;
        }

        this.repository.update(id, event);
        res.json(event);
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({ message: "Id is required" });
            return;
        }

        this.repository.delete(id);
        res.json({ message: "Event deleted" });
    }

    userBoard = (req: Request, res: Response) => {
        res.status(200).send({ message: "User Content." });
    };

}