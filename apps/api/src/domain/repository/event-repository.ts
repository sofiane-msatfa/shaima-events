import type { Event } from "@/domain/entity/event.js";
import type { EventFilters } from "@common/dto/event-filters.js";
import type { EventCreateRequest } from "@common/dto/event-create-request.js";
import type { PaginationResponse } from "@common/dto/pagination-response.js";

export interface EventRepository {
  create(event: EventCreateRequest, authordId: string): Promise<Event>;
  delete(id: string): Promise<void>;
  findAll(filters?: Partial<EventFilters>): Promise<PaginationResponse<Event>>;
  findById(id: string): Promise<Event | null>;
  update(id: string, event: Partial<Event>): Promise<Event | null>;
}
