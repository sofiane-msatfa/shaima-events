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
  capacity: z.coerce.number().positive().int(),
  artists: z
    .union([z.array(z.string()), z.string()])
    .transform((value) => {
      return Array.isArray(value) ? value : [value];
    })
    .optional(),
  illustration: z.string().url(),
});

export type EventRequest = z.infer<typeof eventRequestSchema>;
