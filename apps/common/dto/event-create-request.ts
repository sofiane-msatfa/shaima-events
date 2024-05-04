import { z } from "zod";
import { eventRequestSchema } from "./event-request.js";
import { EventCategory } from "../enum/event-category.js";

export const eventCreateRequestSchema = eventRequestSchema
  .omit({ participants: true })
  .extend({
    tags: z.array(z.string()).optional(),
    // medias: z.array(z.string()).min(1),
    medias: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === EventCategory.Concert) {
      if (!data.artists || data.artists.length === 0) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "artists is required for Concert category",
          path: ctx.path,
        });
      }
    }

    return true;
  });

export type EventCreateRequest = z.infer<typeof eventCreateRequestSchema>;
