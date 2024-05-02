import { IDENTIFIER } from "@/dependency/identifiers.js";
import { EventRepository } from "@/infrastructure/database/mongo/repository/event.js";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { getUserFromJWT } from "../middleware/auth-jwt.js";

@injectable()
export class EventController {

    constructor(@inject(IDENTIFIER.EventRepository) private readonly repository: EventRepository) { }

    findAll = async (req: Request, res: Response) => {
        try {

            const events = await this.repository.findAll({});
            res.json(events);
        } catch (error) {
            console.error("Error fetching events:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const user = await getUserFromJWT(req.cookies.jwt_token);
            const id = req.params.id!;
            const event = await this.repository.findById(id);

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            if (event.userId.toString() !== user!.id) {

                return res.status(401).json({ message: "Unauthorized" });
            }
            
            res.json(event);

        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    create = async (req: Request, res: Response) => {
        try {
            const eventData = req.body;

            const jwt = req.cookies.jwt_token;

            const user = await getUserFromJWT(jwt);

            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const event = this.repository.create({ ...eventData, userId: user.id });

            res.json(event);
        } catch (error) {
            console.error("Error creating event:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const user = await getUserFromJWT(req.cookies.jwt_token);
            const id = req.params.id!;
            const event = await this.repository.findById(id);

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            if (event.userId.toString() !== user!.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            await this.repository.update(id, event);

            res.json(event);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const user = await getUserFromJWT(req.cookies.jwt_token);
            const id = req.params.id!;
            const event = await this.repository.findById(id);

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            if (event.userId.toString() !== user!.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            await this.repository.delete(id);
            res.json({ message: "Event deleted" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
