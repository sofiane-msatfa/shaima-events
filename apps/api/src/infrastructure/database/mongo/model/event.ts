import { Collection } from "@/domain/enum/collection.js";
import { EventCategory } from "@/domain/enum/event-category.js";
import { Schema, SchemaTypes, model } from "mongoose";
import type { Types, Document } from "mongoose";

interface EventDocument extends Document {
  name: string;
  description?: string;
  category: EventCategory;
  location: string;
  startTime: Date;
  endTime: Date;
  author: Types.ObjectId;
  participants: Types.ObjectId[];
  tags: string[];
  medias: string[];
  capacity: number;
  artists?: string[];
}

const eventSchema = new Schema<EventDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: Object.values(EventCategory),
      required: true,
    },
    location: { type: String, required: false },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    author: {
      type: SchemaTypes.ObjectId,
      ref: Collection.User,
      required: true,
    },
    participants: [{ type: SchemaTypes.ObjectId, ref: Collection.User }],
    tags: [{ type: String }],
    medias: [{ type: String }],
    capacity: { type: Number, required: true },
    artists: {
      type: [{ type: String }],
      required: function () {
        return this.category === EventCategory.Concert;
      },
    },
  },
  { timestamps: true },
);

const EventModel = model<EventDocument>(Collection.Event, eventSchema);

export default EventModel;
