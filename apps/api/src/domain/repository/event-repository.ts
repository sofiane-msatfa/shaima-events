import type { EventRequest } from "../dto/event-request.js";

export interface EventRepository {
  create(event: EventRequest): Promise<Event>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  update(id: string, event: Partial<Event>): Promise<Event | null>;
}
