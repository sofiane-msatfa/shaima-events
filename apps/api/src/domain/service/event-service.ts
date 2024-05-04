import type { ResultAsync } from "neverthrow";
import type { Event } from "@common/dto/event.js";
import type { EventError } from "@/domain/error/event-error.js";
import type { EventFilters } from "@common/dto/event-filters.js";
import type { UserLight } from "@common/dto/user-light.js";
import type { EventCreateRequest } from "@common/dto/event-create-request.js";
import type { PaginationResponse } from "@common/dto/pagination-response.js";
import type { EventUpdateRequest } from "@common/dto/event-update-request.js";

export interface EventService {
  getEvents(
    filters: Partial<EventFilters>,
  ): Promise<ResultAsync<PaginationResponse<Event>, EventError>>;
  getEvent(id: string): Promise<ResultAsync<Event, EventError>>;
  createEvent(event: EventCreateRequest, user: UserLight): Promise<ResultAsync<Event, EventError>>;
  deleteEvent(id: string, user: UserLight): Promise<ResultAsync<void, EventError>>;
  updateEvent(
    id: string,
    event: EventUpdateRequest,
    user: UserLight,
  ): Promise<ResultAsync<Event, EventError>>;
}
