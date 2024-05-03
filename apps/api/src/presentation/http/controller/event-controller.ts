import { inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { ResultAsync } from "neverthrow";
import { HttpCode } from "@/domain/enum/http-code.js";
import type { UserRepository } from "@/domain/repository/user-repository.js";
import type { RequestHandler, Response } from "express";
import type { EventRepository } from "@/domain/repository/event-repository.js";
import { eventRequestSchema } from "@/domain/dto/event-request.js";
import { verifyAccessToken } from "@/utils/jwt.js";

@injectable()
export class EventController {
    @inject(IDENTIFIER.EventRepository)
    private readonly eventRepository!: EventRepository;

    public getEvents: RequestHandler = async (req, res, next) => {
        const events = await ResultAsync.fromPromise(
            this.eventRepository.findAll(),
            (error) => error,
        );

        if (events.isErr()) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(events.error);
        }

        res.status(HttpCode.OK).json(events.value);
        next();
    };

    public createEvent: RequestHandler = async (req, res, next) => {
        console.log((req.headers.cookie!));
        const validation = eventRequestSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(HttpCode.BAD_REQUEST).json(validation.error);
        }
        
        const newEvent = await ResultAsync.fromPromise(
            this.eventRepository.create(validation.data),
            (error) => error,
        );

        if (newEvent.isErr()) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(newEvent.error);
        }

        res.status(HttpCode.CREATED).json(newEvent.value);
        next();
    };
}
