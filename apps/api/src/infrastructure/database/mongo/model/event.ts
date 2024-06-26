import type { Types, Document } from "mongoose";
import { Schema, SchemaTypes, model, type PaginateModel } from "mongoose";
import { Collection } from "@/domain/enum/collection.js";
import { EventCategory } from "@common/enum/event-category.js";
import paginate from "mongoose-paginate-v2";

export interface EventDocument extends Document {
  name: string;
  description?: string;
  category: EventCategory;
  location: string;
  address: string;
  startTime: Date;
  endTime: Date;
  author: Types.ObjectId;
  participants: Types.ObjectId[];
  tags: string[];
  medias: string[];
  capacity: number;
  artists?: string[];
  illustration: string;
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
    address: { type: String, required: true },
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
    illustration: { type: String, required: true },
  },
  { timestamps: true },
);

eventSchema.plugin(paginate);

const EventModel = model<EventDocument, PaginateModel<EventDocument>>(
  Collection.Event,
  eventSchema,
);

export default EventModel;
