import type { RequestHandler, Response } from "express";
import type { EventService } from "@/domain/service/event-service.js";

import { inject, injectable } from "inversify";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { HttpCode } from "@/domain/enum/http-code.js";
import { eventCreateRequestSchema } from "@common/dto/event-create-request.js";
import { eventUpdateRequestSchema } from "@common/dto/event-update-request.js";
import { eventFiltersSchema } from "@common/dto/event-filters.js";
import { EventError } from "@/domain/error/event-error.js";
import { paginationFiltersSchema } from "@common/dto/pagination-filters.js";
import { asyncHandler, getUserLightFromRequest } from "@/utils/express.js";
import { assert } from "@/utils/validation.js";

@injectable()
export class EventController {
  @inject(IDENTIFIER.EventService)
  private readonly eventService!: EventService;

  public getEvents: RequestHandler = asyncHandler(async (req, res, next) => {
    // on peut parse car tous les paramètres sont optionnels
    const filters = eventFiltersSchema.partial().parse(req.query);

    const events = await this.eventService.getEvents(filters);

    if (events.isErr()) {
      this.handleEventError(events.error, res);
      return next();
    }

    res.status(HttpCode.OK).json(events.value);
  });

  public createEvent: RequestHandler = asyncHandler(async (req, res, next) => {
    const eventCreateRequest = assert(req.body, eventCreateRequestSchema);

    if (eventCreateRequest.isErr()) {
      return res.status(HttpCode.BAD_REQUEST).json(eventCreateRequest.error);
    }

    const user = getUserLightFromRequest(req);
    const newEvent = await this.eventService.createEvent(eventCreateRequest.value, user);

    if (newEvent.isErr()) {
      this.handleEventError(newEvent.error, res);
      return next();
    }

    res.status(HttpCode.CREATED).json(newEvent.value);
  });

  public deleteEvent: RequestHandler = asyncHandler(async (req, res, next) => {
    const eventId = req.params.id as string;
    const currentUser = getUserLightFromRequest(req);

    const deletionResult = await this.eventService.deleteEvent(eventId, currentUser);

    if (deletionResult.isErr()) {
      this.handleEventError(deletionResult.error, res);
      return next();
    }

    res.status(HttpCode.NO_CONTENT).send();
  });

  // l'objet est le même peu import l'utilisateur pour l'instant
  public getEvent: RequestHandler = async (req, res) => {
    const eventId = req.params.id as string;

    const lookupResult = await this.eventService.getEvent(eventId);

    if (lookupResult.isErr()) {
      this.handleEventError(lookupResult.error, res);
      return;
    }

    res.status(HttpCode.OK).json(lookupResult.value);
  };

  public getAllForCurrentUser: RequestHandler = asyncHandler(async (req, res, next) => {
    const { page, pageSize } = paginationFiltersSchema.parse(req.query);

    const currentUser = getUserLightFromRequest(req);

    const filters = {
      $or: [{ author: currentUser.id }, { participants: currentUser.id }],
      page,
      pageSize,
    };

    // Get all events for the current user (as author or participant)
    const events = await this.eventService.getEvents(filters);
    console.log(events)
    if (events.isErr()) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: events.error });
    }

    res.status(HttpCode.OK).json(events.value);
  });

  public updateEvent: RequestHandler = asyncHandler(async (req, res, next) => {
    const eventId = req.params.id as string;
    const currentUser = getUserLightFromRequest(req);
    const eventRequest = assert(req.body, eventUpdateRequestSchema);

    if (eventRequest.isErr()) {
      return res.status(HttpCode.BAD_REQUEST).json(eventRequest.error);
    }

    const updatedEvent = await this.eventService.updateEvent(
      eventId,
      eventRequest.value,
      currentUser,
    );

    if (updatedEvent.isErr()) {
      this.handleEventError(updatedEvent.error, res);
      return next();
    }

    res.status(HttpCode.OK).json(updatedEvent.value);
  });

  public joinOrLeaveEvent: RequestHandler = asyncHandler(async (req, res, next) => {
    const eventId = req.params.id as string;
    const currentUser = getUserLightFromRequest(req);

    const participationResult = await this.eventService.joinOrLeaveEvent(eventId, currentUser);

    if (participationResult.isErr()) {
      this.handleEventError(participationResult.error, res);
      return next();
    }

    res.status(HttpCode.OK).json(participationResult.value);
  });

  private handleEventError(error: EventError, res: Response): Response {
    switch (error) {
      case EventError.CreationFailed:
      case EventError.DeletionFailed:
      case EventError.LookupFailed:
      case EventError.UpdateFailed:
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send("Internal server error");
      case EventError.NotFound:
        return res.status(HttpCode.NOT_FOUND).send("Event not found");
      case EventError.Forbidden:
        return res.status(HttpCode.FORBIDDEN).send("Forbidden");
    }
  }
}
