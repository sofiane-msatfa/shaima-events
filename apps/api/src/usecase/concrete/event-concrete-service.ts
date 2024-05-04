import type { Event } from "@common/dto/event.js";
import type { EventFilters } from "@common/dto/event-filters.js";
import type { EventRepository } from "@/domain/repository/event-repository.js";
import type { EventService } from "@/domain/service/event-service.js";
import type { UserLight } from "@common/dto/user-light.js";
import type { EventCreateRequest } from "@common/dto/event-create-request.js";
import type { PaginationResponse } from "@common/dto/pagination-response.js";
import type { EventUpdateRequest } from "@common/dto/event-update-request.js";

import { injectable, inject } from "inversify";
import { ResultAsync, errAsync, okAsync } from "neverthrow";
import { IDENTIFIER } from "@/dependency/identifiers.js";
import { EventError } from "@/domain/error/event-error.js";

@injectable()
export class EventConcreteService implements EventService {
  @inject(IDENTIFIER.EventRepository)
  private readonly eventRepository!: EventRepository;

  async getEvents(
    filters: Partial<EventFilters>,
  ): Promise<ResultAsync<PaginationResponse<Event>, EventError>> {
    const eventListResult = await ResultAsync.fromPromise(
      this.eventRepository.findAll(filters),
      (error) => error,
    );

    if (eventListResult.isErr()) {
      console.error(eventListResult.error);
      return errAsync(EventError.LookupFailed);
    }

    return okAsync(eventListResult.value);
  }

  async getEvent(id: string): Promise<ResultAsync<Event, EventError>> {
    const eventResult = await ResultAsync.fromPromise(
      this.eventRepository.findById(id),
      (error) => error,
    );

    if (eventResult.isErr()) {
      console.error(eventResult.error);
      return errAsync(EventError.LookupFailed);
    }

    const event = eventResult.value;

    if (!event) {
      return errAsync(EventError.NotFound);
    }

    return okAsync(event);
  }

  async createEvent(
    event: EventCreateRequest,
    user: UserLight,
  ): Promise<ResultAsync<Event, EventError>> {
    const eventResult = await ResultAsync.fromPromise(
      this.eventRepository.create(event, user.id),
      (error) => error,
    );

    if (eventResult.isErr()) {
      console.error(eventResult.error);
      return errAsync(EventError.CreationFailed);
    }

    return okAsync(eventResult.value);
  }

  async deleteEvent(id: string, user: UserLight): Promise<ResultAsync<void, EventError>> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      return errAsync(EventError.NotFound);
    }

    if (event.author !== user.id) {
      return errAsync(EventError.Forbidden);
    }

    const deletionResult = await ResultAsync.fromPromise(
      this.eventRepository.delete(id),
      (error) => error,
    );

    if (deletionResult.isErr()) {
      console.error(deletionResult.error);
      return errAsync(EventError.DeletionFailed);
    }

    return okAsync(void 0);
  }

  async updateEvent(
    id: string,
    updateRequest: EventUpdateRequest,
    user: UserLight,
  ): Promise<ResultAsync<Event, EventError>> {
    const existingEvent = await this.eventRepository.findById(id);

    if (!existingEvent) {
      return errAsync(EventError.NotFound);
    }

    if (existingEvent.author !== user.id) {
      return errAsync(EventError.Forbidden);
    }

    const updatedEvent = await ResultAsync.fromPromise(
      this.eventRepository.update(id, updateRequest),
      (error) => error,
    );

    if (updatedEvent.isErr()) {
      console.error(updatedEvent.error);
      return errAsync(EventError.UpdateFailed);
    }

    if (!updatedEvent.value) {
      return errAsync(EventError.NotFound);
    }

    return okAsync(updatedEvent.value);
  }

  async joinOrLeaveEvent(id: string, user: UserLight): Promise<ResultAsync<Event, EventError>> {
    const existingEvent = await this.eventRepository.findById(id);

    if (!existingEvent) {
      return errAsync(EventError.NotFound);
    }

    if (existingEvent.participants.includes(user.id)) {
      existingEvent.participants = existingEvent.participants.filter((participant) => participant !== user.id);
    }
    else {
      existingEvent.participants.push(user.id);
    }

    const updatedEvent = await ResultAsync.fromPromise(
      this.eventRepository.update(id, existingEvent),
      (error) => error,
    );

    if (updatedEvent.isErr()) {
      console.error(updatedEvent.error);
      return errAsync(EventError.UpdateFailed);
    }

    if (!updatedEvent.value) {
      return errAsync(EventError.NotFound);
    }

    return okAsync(updatedEvent.value);
  }
}
