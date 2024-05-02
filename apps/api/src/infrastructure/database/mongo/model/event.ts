import { Document, Model, Schema, Types, model } from "mongoose";
import { z } from "zod";

export interface EventDocument extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    hours: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    userId: Types.ObjectId; 
}

const EventSchema = new Schema<EventDocument>({
    title: { type: String, index: true },
    description: { type: String },
    date: { type: Date, index: true },
    location: { type: String },
    hours: { type: Number },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    image: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User',  } 
});

export const EventModel: Model<EventDocument> = model<EventDocument>('Event', EventSchema, 'event');

EventSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.userId;
        delete ret.__v;
        return ret;
    }
});

export const eventZodSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    hours: z.number(),
    image: z.string(),
});
