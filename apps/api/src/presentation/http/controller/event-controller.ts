import { inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { ResultAsync } from "neverthrow";
import { HttpCode } from "@/domain/enum/http-code.js";
import type { RequestHandler, Response } from "express";
import type { EventRepository } from "@/domain/repository/event-repository.js";
import { eventRequestSchema } from "@/domain/dto/event-request.js";
import { getUserLightFromRequest } from "@/utils/express.js";
import { Types } from "mongoose";
import { AuthenticationError } from "@/domain/error/authentication-error.js";

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
        const validation = eventRequestSchema.safeParse(req.body);

        const currentUser = getUserLightFromRequest(req);

        if (!validation.success) {
            return res.status(HttpCode.BAD_REQUEST).json(validation.error);
        }
        const authorId = new Types.ObjectId(currentUser.id);

        const newEvent = await ResultAsync.fromPromise(
            this.eventRepository.create(validation.data, authorId),
            (error) => error,
        );

        if (newEvent.isErr()) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(newEvent.error);
        }

        res.status(HttpCode.CREATED).json(newEvent.value);
    };

    public deleteEvent: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        const currentUser = getUserLightFromRequest(req);

        if (!id) return res.status(HttpCode.BAD_REQUEST).json({ message: "Id is required" });

        const event = await ResultAsync.fromPromise(
            this.eventRepository.findById(id),
            (error) => error,
        );

        if (event.isErr()) return res.status(HttpCode.NOT_FOUND).json("Error");

        if (!event.value) return res.status(HttpCode.NOT_FOUND).json("Error");

        if (event.value.author.toString() !== currentUser.id) return res.status(HttpCode.FORBIDDEN).json(AuthenticationError.Unauthorized);

        const deletedEvent = await ResultAsync.fromPromise(
            this.eventRepository.delete(id),
            (error) => error,
        );

        if (deletedEvent.isErr()) { return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(deletedEvent.error); }

        res.status(HttpCode.NO_CONTENT).send();
    };

    public findEventById: RequestHandler = async (req, res, next) => {
        const { id } = req.params!;

        if (!id) return res.status(HttpCode.BAD_REQUEST).json({ message: "Id is required" });

        const currentUser = getUserLightFromRequest(req);

        const event = await ResultAsync.fromPromise(
            this.eventRepository.findById(id),
            (error) => error,
        );

        if (event.isErr()) { return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(event.error); }

        if (!event.value) return res.status(HttpCode.NOT_FOUND).json("Error");

        if (event.value.author.toString() !== currentUser.id) return res.status(HttpCode.FORBIDDEN).json(AuthenticationError.Unauthorized);

        res.status(HttpCode.OK).json(event.value);
    }

    public findAllFromAuthorId: RequestHandler = async (req, res, next) => {
        const currentUser = getUserLightFromRequest(req);

        const authorId = new Types.ObjectId(currentUser.id);

        const events = await ResultAsync.fromPromise(
            this.eventRepository.findAllByAuthorId(authorId),
            (error) => error,
        );

        if (events.isErr()) { return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(events.error); }

        res.status(HttpCode.OK).json(events.value);
    }
}
