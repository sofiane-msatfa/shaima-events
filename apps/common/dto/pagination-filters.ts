import { z } from "zod";

export const paginationFiltersSchema = z.object({
  page: z.coerce.number().int().default(1),
  pageSize: z.coerce.number().int().default(10),
});

export type PaginationFilters = z.infer<typeof paginationFiltersSchema>;
