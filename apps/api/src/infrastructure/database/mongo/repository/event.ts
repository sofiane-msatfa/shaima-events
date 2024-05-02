import { injectable } from "inversify";
import BaseRepository from "./base-repository.js";
import { EventModel, type EventDocument } from "../model/event.js";

@injectable()
export class EventRepository extends BaseRepository<EventDocument> {
    model = EventModel;
}

