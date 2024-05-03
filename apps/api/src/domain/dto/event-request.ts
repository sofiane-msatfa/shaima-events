import { z } from "zod";
import { EventCategory } from "../enum/event-category.js";

export const eventRequestSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(5).max(255),
    category: z.enum([EventCategory.Concert, EventCategory.Festival, EventCategory.Club, EventCategory.Party]),
    location: z.string().min(5).max(255),
    startTime: z.string().date(),
    endTime: z.string().date(),
    participants: z.array(z.string().min(5).max(255)),
    tags: z.array(z.string().max(255)),
    medias: z.array(z.string().max(255)),
    capacity: z.number(),
    artists: z.array(z.string().max(255)),
});

export type EventRequest = z.infer<typeof eventRequestSchema>;
