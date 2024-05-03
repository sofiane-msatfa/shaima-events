import type { Types } from "mongoose";
import type { EventRequest } from "../dto/event-request.js";
import type { Event } from "@/domain/entity/event.js";

export interface EventRepository {
  create(event: EventRequest, authordId: Types.ObjectId): Promise<Event>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  findAllByAuthorId(authorId: Types.ObjectId): Promise<Event[]>;
  update(id: string, event: Partial<Event>): Promise<Event | null>;
}
