import { Types, type FilterQuery, type PaginateOptions } from "mongoose";
import type { Event } from "@common/dto/event.js";
import type { EventRepository } from "@/domain/repository/event-repository.js";
import type { EventFilters } from "@common/dto/event-filters.js";
import type { EventCreateRequest } from "@common/dto/event-create-request.js";
import type { PaginationResponse } from "@common/dto/pagination-response.js";
import type { EventDocument } from "../model/event.js";
import type { PaginateResult } from "mongoose";

import { injectable } from "inversify";
import EventModel from "../model/event.js";

@injectable()
export class EventMongoRepository implements EventRepository {
  async create(event: EventCreateRequest, authorId: string): Promise<Event> {
    const newEvent = await EventModel.create({ ...event, author: authorId });
    return this.toEventEntity(newEvent);
  }

  async delete(id: string): Promise<void> {
    await EventModel.findByIdAndDelete(id);
  }

  async findAll(filters?: Partial<EventFilters>): Promise<PaginationResponse<Event>> {
    const queryFilters = this.buildEventQueryFilters(filters, '$or');
    const pagination = this.buildEventPagination(filters);

    console.log(queryFilters)

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

  private buildEventQueryFilters(
    filters?: Partial<EventFilters>,
    operator: string = ''
  ): FilterQuery<EventDocument> {
    const query: FilterQuery<EventDocument> = {};

    // filters
    if (filters?.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters?.category) query.category = filters.category;
    if (filters?.location) query.location = filters.location;
    if (filters?.address) query.address = { $regex: filters.address, $options: "i" };
    if (filters?.startTime) query.startTime = { $gte: filters.startTime };
    if (filters?.endTime) query.endTime = { $lte: filters.endTime };
    if (filters?.author) query[operator] = [...(query[operator] || []), { author: filters.author }];
    if (filters?.participants) query[operator] = [...(query[operator] || []), { participants: { $in: filters.participants.map(participant => new Types.ObjectId(participant)) } }];
    if (filters?.tags) query.tags = { $in: filters.tags };
    if (filters?.capacityMin) query.capacity = { ...(query.capacity || {}), $gte: filters.capacityMin };
    if (filters?.capacityMax) query.capacity = { ...(query.capacity || {}), $lte: filters.capacityMax };

    return query;
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
    };
  }
}
