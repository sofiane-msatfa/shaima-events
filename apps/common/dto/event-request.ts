import { z } from "zod";
import { EventCategory } from "../enum/event-category.js";

/** Base event request schema */
export const eventRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.nativeEnum(EventCategory),
  location: z.string(),
  address: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  participants: z.array(z.string()),
  tags: z.array(z.string()),
  medias: z.array(z.string()),
  capacity: z.coerce.number().int(),
  artists: z.array(z.string()).optional(),
});

export type EventRequest = z.infer<typeof eventRequestSchema>;
