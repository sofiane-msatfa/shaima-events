import { z } from "zod";
import { paginationFiltersSchema } from "./pagination-filters.js";
import { EventCategory } from "../enum/event-category.js";

export const eventFiltersSchema = paginationFiltersSchema.extend({
  name: z.string(),
  category: z.nativeEnum(EventCategory),
  location: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  author: z.string(),
  participants: z.array(z.string()),
  tags: z.array(z.string()),
  capacityMin: z.coerce.number().int(),
  capacityMax: z.coerce.number().int(),
});

export type EventFilters = z.infer<typeof eventFiltersSchema>;
