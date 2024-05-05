import { z } from "zod";
import { eventRequestSchema } from "./event-request.js";
import { EventCategory } from "../enum/event-category.js";

export const eventUpdateRequestSchema = eventRequestSchema.partial().superRefine((data, ctx) => {
  if (data.category === EventCategory.Concert) {
    if (!data.artists || data.artists.length === 0) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "artists is required for Concert category",
        path: ["artists"],
      });
    }
  }

  return true;
});

export type EventUpdateRequest = z.infer<typeof eventUpdateRequestSchema>;
