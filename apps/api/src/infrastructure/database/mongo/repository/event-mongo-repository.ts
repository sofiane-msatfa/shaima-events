import { injectable } from "inversify";
import type { EventRepository } from "@/domain/repository/event-repository.js";
import type { EventRequest } from "@/domain/dto/event-request.js";
import EventModel from "../model/event.js";

@injectable()
export class EventMongoRepository implements EventRepository {
    async create(event: EventRequest): Promise<Event> {
        console.log(event)
        const newEvent = await EventModel.create(event);
        return newEvent.toJSON();
    }

    async delete(id: string): Promise<void> {
        await EventModel.findByIdAndDelete(id);
    }

    async findAll(): Promise<Event[]> {
        const events = await EventModel.find();
        return events.map((event) => event.toJSON());
    }

    async findById(id: string): Promise<Event | null> {
        const event = await EventModel.findById(id);
        if (!event) return null;
        return event.toJSON();
    }

    async update(id: string, event: Partial<Event>): Promise<Event | null> {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, event, {
            new: true,
        });
        if (!updatedEvent) return null;
        return updatedEvent.toJSON();
    }
}
