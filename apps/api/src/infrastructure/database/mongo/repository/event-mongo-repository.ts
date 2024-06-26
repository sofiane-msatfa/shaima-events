import type { PaginateOptions } from "mongoose";
import type { Event } from "@common/dto/event.js";
import type { EventRepository } from "@/domain/repository/event-repository.js";
import type { EventFilters } from "@common/dto/event-filters.js";
import type { EventCreateRequest } from "@common/dto/event-create-request.js";
import type { PaginationResponse } from "@common/dto/pagination-response.js";
import type { EventDocument } from "../model/event.js";
import type { PaginateResult } from "mongoose";

import { injectable } from "inversify";
import EventModel from "../model/event.js";
import { buildNonExclusiveQueryFilters } from "../utils/event-condition-builder.js";

@injectable()
export class EventMongoRepository implements EventRepository {
  async create(event: EventCreateRequest, authorId: string): Promise<Event> {
    const newEvent = await EventModel.create({ ...event, author: authorId });
    return this.toEventEntity(newEvent);
  }

  async delete(id: string): Promise<void> {
    await EventModel.findByIdAndDelete(id);
  }

  async findAll(
    filters: Partial<EventFilters> = {},
    nonExclusiveKeys: Array<keyof EventFilters> = [],
  ): Promise<PaginationResponse<Event>> {
    const queryFilters = buildNonExclusiveQueryFilters(filters, nonExclusiveKeys);
    const pagination = this.buildEventPagination(filters);

    const events = await EventModel.paginate(queryFilters, pagination);

    return this.buildEventPaginateResponse(events);
  }

  async findById(id: string): Promise<Event | null> {
    const event = await EventModel.findById(id);
    if (!event) return null;
    return this.toEventEntity(event);
  }

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    const updatedEvent = await EventModel.findByIdAndUpdate(id, event, {
      new: true,
    });
    if (!updatedEvent) return null;
    return this.toEventEntity(updatedEvent);
  }

  private buildEventPagination(filters?: Partial<EventFilters>): PaginateOptions {
    const pageSize = filters?.pageSize || 50;
    const limit = pageSize > 0 ? pageSize : 50;

    const currentPage = filters?.page || 1;
    const page = currentPage > 0 ? currentPage : 1;

    // add sort logic here
    return { page, limit };
  }

  private buildEventPaginateResponse(
    paginateResult: PaginateResult<EventDocument>,
  ): PaginationResponse<Event> {
    return {
      data: paginateResult.docs.map((event) => this.toEventEntity(event)),
      totalCount: paginateResult.totalDocs,
      totalPages: paginateResult.totalPages,
      page: paginateResult.page || 1,
      pageSize: paginateResult.limit,
      hasPrevPage: paginateResult.hasPrevPage,
      hasNextPage: paginateResult.hasNextPage,
      prevPage: paginateResult.prevPage || null,
      nextPage: paginateResult.nextPage || null,
    };
  }

  private toEventEntity(event: EventDocument): Event {
    return {
      id: event._id.toString(),
      name: event.name,
      description: event.description,
      category: event.category,
      location: event.location,
      address: event.address,
      startTime: event.startTime,
      endTime: event.endTime,
      author: event.author.toString(),
      participants: event.participants.map((participant) => participant.toString()),
      tags: event.tags,
      medias: event.medias,
      capacity: event.capacity,
      artists: event.artists,
      illustration: event.illustration,
    };
  }
}
